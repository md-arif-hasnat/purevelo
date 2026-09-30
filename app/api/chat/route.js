const KNOWLEDGE = `
You are the PureVelo website assistant for Velora Grain & Foods. Be concise, friendly and professional.
Only answer from verified business information. Never invent prices, MOQ, certifications, ingredients, shipping terms, stock, delivery times, export countries, or commercial commitments.
PureVelo is manufactured by Velora Grain & Foods in Baramati, Maharashtra, India.
Brand positioning: Inspired by Italy. Crafted in India.
Business enquiries are welcomed from distributors, importers, wholesalers, retailers, supermarkets and food-service buyers.
Contact: contact@purevelofood.com, +91 75880 34596.\nFacebook: https://www.facebook.com/uftbd
Address: Industrial Drive, Plot No. E-128/E, Baramati MIDC, Bhigwan Road, Baramati, District Pune, Maharashtra 413133, India.
Products displayed: Farfalle; Macaroni; Rigatoni; Linguine; Cavatappi; Premium Fusilli; Premium Conchiglie; Premium Penne; Mini Spaghetti; Roasted Pasta Vermicelli; Roasted Chutki Shemai.
Known pack sizes: Farfalle 250g; Macaroni 250g; Rigatoni 250g; Linguine 250g; Cavatappi 250g; Premium Fusilli 250g; Premium Conchiglie 250g; Premium Penne 250g; Mini Spaghetti 200g; Roasted Pasta Vermicelli 200g; Roasted Chutki Shemai 350g.
Known cooking times: Farfalle 12 min; Linguine 8 min; Cavatappi 10 min; Premium Fusilli 15 min; Premium Conchiglie 15 min; Premium Penne 15 min.
`;

const PRODUCTS='Farfalle, Macaroni, Rigatoni, Linguine, Cavatappi, Premium Fusilli, Premium Conchiglie, Premium Penne, Mini Spaghetti, Roasted Pasta Vermicelli and Roasted Chutki Shemai.';
function freeReply(raw){
 const q=raw.toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
 if(/^(hi|hello|hey|good morning|good afternoon|good evening)$/.test(q)) return 'Hello! Welcome to PureVelo. I can help with our products, pack sizes, cooking times, company information, contact details and distributor enquiries.';
 if(/product|pasta|vermicelli|shemai|range|what do you (have|sell)/.test(q)) return `Our current range includes: ${PRODUCTS} You can open any product card on this page for more details.`;
 if(/facebook|fb|social media|social page|social account/.test(q)) return 'You can follow us on Facebook: https://www.facebook.com/uftbd';\n if(/contact|email|phone|call|whatsapp|reach/.test(q)) return 'You can contact PureVelo at contact@purevelofood.com or +91 75880 34596. Facebook: https://www.facebook.com/uftbd. You can also use the Business Enquiry form on this page.';
 if(/address|location|where.*(based|located)|factory|manufactur/.test(q)) return 'PureVelo is manufactured by Velora Grain & Foods in Baramati, Maharashtra, India. Address: Industrial Drive, Plot No. E-128/E, Baramati MIDC, Bhigwan Road, Baramati, District Pune, Maharashtra 413133, India.';
 if(/distribut|importer|wholesale|retail|supermarket|food service|business enquiry|dealer|become.*partner/.test(q)) return 'We welcome enquiries from distributors, importers, wholesalers, retailers, supermarkets and food-service buyers. Please use the Business Enquiry form on this page or email contact@purevelofood.com.';
 if(/about|who.*purevelo|company|velora|origin|italy|india/.test(q)) return 'PureVelo is a brand manufactured by Velora Grain & Foods in Baramati, Maharashtra, India. Our positioning is: Inspired by Italy. Crafted in India.';
 const packs={farfalle:'250g',macaroni:'250g',rigatoni:'250g',linguine:'250g',cavatappi:'250g','premium fusilli':'250g','premium conchiglie':'250g','premium penne':'250g','mini spaghetti':'200g','roasted pasta vermicelli':'200g','roasted chutki shemai':'350g'};
 if(/pack|size|weight|gram|net/.test(q)){for(const [p,v] of Object.entries(packs))if(q.includes(p))return `${p.replace(/\b\w/g,c=>c.toUpperCase())} is displayed in a ${v} pack.`;return 'Most displayed pasta packs are 250g. Mini Spaghetti and Roasted Pasta Vermicelli are 200g, while Roasted Chutki Shemai is 350g.';}
 const times={farfalle:'12 minutes',linguine:'8 minutes',cavatappi:'10 minutes','premium fusilli':'15 minutes','premium conchiglie':'15 minutes','premium penne':'15 minutes'};
 if(/cook|cooking|minute|prepare|boil/.test(q)){for(const [p,v] of Object.entries(times))if(q.includes(p))return `The displayed cooking time for ${p.replace(/\b\w/g,c=>c.toUpperCase())} is ${v}.`;}
 if(/price|cost|moq|minimum order|certificate|certification|ingredient|shipping|delivery|stock|available|export countr|payment term/.test(q)) return 'That commercial information is not confirmed in this website assistant. Please use the Business Enquiry form or email contact@purevelofood.com for an accurate quotation or confirmation.';
 return null;
}

export async function POST(request) {
 try {
  const body=await request.json();
  const messages=Array.isArray(body.messages)?body.messages.slice(-8):[];
  if(!messages.length) return Response.json({error:'Message required.'},{status:400});
  const latest=String(messages[messages.length-1]?.content||'').slice(0,500);
  const local=freeReply(latest);
  if(local) return Response.json({reply:local,source:'local'});
  if(!process.env.OPENAI_API_KEY) return Response.json({reply:'I can help with PureVelo products, contact details, company information and distributor enquiries. For anything else, please use the Business Enquiry form or email contact@purevelofood.com.',source:'fallback'});
  const input=[{role:'system',content:KNOWLEDGE},...messages.map(m=>({role:m.role==='assistant'?'assistant':'user',content:String(m.content||'').slice(0,500)}))];
  const res=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',input,max_output_tokens:180,reasoning:{effort:'none'}})});
  const data=await res.json();
  if(!res.ok){console.error('OpenAI API error',res.status,data?.error?.message||data?.error||'Unknown error');return Response.json({reply:'I do not have that information confirmed. Please use the Business Enquiry form or email contact@purevelofood.com.',source:'fallback'});}
  const reply=(data.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('\n').trim();
  return Response.json({reply:reply||'Please contact contact@purevelofood.com for assistance.',source:'ai'});
 } catch {
  return Response.json({reply:'Please use the Business Enquiry form or email contact@purevelofood.com for assistance.',source:'fallback'});
 }
}
