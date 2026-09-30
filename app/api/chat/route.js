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
 const has=(...terms)=>terms.some(t=>q.includes(t));
 const productNames=['premium conchiglie','premium fusilli','premium penne','roasted pasta vermicelli','roasted chutki shemai','mini spaghetti','farfalle','macaroni','rigatoni','linguine','cavatappi'];
 const packs={farfalle:'250g',macaroni:'250g',rigatoni:'250g',linguine:'250g',cavatappi:'250g','premium fusilli':'250g','premium conchiglie':'250g','premium penne':'250g','mini spaghetti':'200g','roasted pasta vermicelli':'200g','roasted chutki shemai':'350g'};
 const times={farfalle:'12 minutes',linguine:'8 minutes',cavatappi:'10 minutes','premium fusilli':'15 minutes','premium conchiglie':'15 minutes','premium penne':'15 minutes'};
 const named=productNames.find(p=>q.includes(p));
 if(/^(hi|hello|hey|hiya|good morning|good afternoon|good evening|assalamualaikum|salam)$/.test(q)) return 'Hello! Welcome to PureVelo. I can help with our products, pack sizes, cooking times, company information, contact details and business enquiries.';
 if(has('thank','thanks','thank you')) return 'You are welcome! Please let me know if you need help with PureVelo products or business enquiries.';
 if(has('facebook','fb page','fb id','social media','social page','social account','social link')) return 'You can follow us on Facebook: https://www.facebook.com/uftbd';
 if(has('email','e mail','mail address')) return 'Our business email is contact@purevelofood.com.';
 if(has('phone','telephone','mobile number','call you','contact number','whatsapp')) return 'You can contact PureVelo at +91 75880 34596. You can also email contact@purevelofood.com.';
 if(has('contact','reach you','get in touch')) return 'You can contact PureVelo at contact@purevelofood.com or +91 75880 34596. Facebook: https://www.facebook.com/uftbd. You can also use the Business Enquiry form on this page.';
 if(has('address','where are you located','where are you based','your location','factory location','office location')) return 'PureVelo is based in Baramati, Maharashtra, India. Address: Industrial Drive, Plot No. E-128/E, Baramati MIDC, Bhigwan Road, Baramati, District Pune, Maharashtra 413133, India.';
 if(has('manufacturer','manufactured by','who makes','who manufacture','factory')) return 'PureVelo is manufactured by Velora Grain & Foods in Baramati, Maharashtra, India.';
 if(has('brand owner','company name','velora grain','about company','about purevelo','who is purevelo','who are you')) return 'PureVelo is a food brand manufactured by Velora Grain & Foods in Baramati, Maharashtra, India. Our positioning is: Inspired by Italy. Crafted in India.';
 if(has('italian brand','made in italy','product of italy','from italy','origin country','country of origin')) return 'PureVelo is crafted in India and inspired by Italy. It is manufactured in Baramati, Maharashtra, India.';
 if(has('tagline','slogan','brand line','positioning')) return 'PureVelo — Inspired by Italy. Crafted in India.';
 if(has('all products','product list','product range','what products','what do you sell','what do you have','show products','show me products','pasta range','your pasta','types of pasta','which pasta','vermicelli range','shemai range')) return `Our current range includes: ${PRODUCTS} You can open any product card on this page for more details.`;
 if(named && has('pack','size','weight','gram','net wt','net weight','how many grams')) return `${named.replace(/\b\w/g,c=>c.toUpperCase())} is displayed in a ${packs[named]} pack.`;
 if(has('pack sizes','pack size','package size','weights')) return 'Most displayed pasta packs are 250g. Mini Spaghetti and Roasted Pasta Vermicelli are 200g, while Roasted Chutki Shemai is 350g.';
 if(named && has('cook','cooking','boil','minutes','how long','prepare')) return times[named] ? `The displayed cooking time for ${named.replace(/\b\w/g,c=>c.toUpperCase())} is ${times[named]}.` : 'A verified cooking time for that product is not currently listed. Please check the product packaging or contact us for confirmation.';
 if(has('cooking time','how to cook','how long to cook','boiling time')) return 'Displayed cooking times include: Farfalle 12 min, Linguine 8 min, Cavatappi 10 min, Premium Fusilli 15 min, Premium Conchiglie 15 min and Premium Penne 15 min.';
 if(named && has('detail','tell me about','information','info')) return `${named.replace(/\b\w/g,c=>c.toUpperCase())} is part of the PureVelo range. The displayed pack size is ${packs[named]}${times[named] ? ` and the displayed cooking time is ${times[named]}` : ''}. You can open its product card for more details.`;
 if(has('distributor','distribution','become distributor','dealer','dealership','partner with','business partner')) return 'We welcome distributor and dealer enquiries. Please use the Business Enquiry form on this page or email contact@purevelofood.com.';
 if(has('importer','import enquiry','import business')) return 'We welcome enquiries from importers. Please use the Business Enquiry form or email contact@purevelofood.com with your market and requirements.';
 if(has('wholesale','wholesaler','bulk buyer','bulk order')) return 'We welcome wholesale and bulk business enquiries. Please use the Business Enquiry form or email contact@purevelofood.com.';
 if(has('retailer','retail business','supermarket','grocery chain')) return 'Retailers and supermarkets are welcome to contact our team through the Business Enquiry form or contact@purevelofood.com.';
 if(has('food service','restaurant supply','hotel supply','horeca')) return 'We welcome food-service business enquiries. Please use the Business Enquiry form or email contact@purevelofood.com.';
 if(has('b2b','business enquiry','business inquiry','trade enquiry','trade inquiry')) return 'For B2B enquiries, please use the Business Enquiry form on this page or email contact@purevelofood.com.';
 if(has('export','international buyer','global inquiry','global enquiry','overseas')) return 'For international or export-related business enquiries, please contact us through the Business Enquiry form or email contact@purevelofood.com. Specific export markets and terms should be confirmed by our team.';
 if(has('price','pricing','cost','rate','quotation','quote','price list')) return 'Prices and quotations are not published in this website assistant. Please use the Business Enquiry form or email contact@purevelofood.com for an accurate quotation.';
 if(has('moq','minimum order','minimum quantity','order quantity')) return 'MOQ is not confirmed in this website assistant. Please use the Business Enquiry form or email contact@purevelofood.com for the applicable minimum order quantity.';
 if(has('payment term','payment method','credit term','advance payment')) return 'Payment terms are not confirmed in this website assistant. Please contact our business team for the applicable terms.';
 if(has('shipping','freight','delivery','lead time','dispatch','transport')) return 'Shipping, delivery and lead-time details depend on the enquiry and are not confirmed here. Please contact our business team for accurate information.';
 if(has('stock','in stock','availability','available now')) return 'Live stock availability is not shown in this website assistant. Please contact our team for current availability.';
 if(has('certificate','certification','certified','iso','haccp','fssai','halal')) return 'Certification details are not confirmed in this website assistant. Please contact our team for verified documentation.';
 if(has('ingredient','ingredients','composition','made from','maida','semolina','durum')) return 'Please refer to the product packaging or contact our team for verified ingredient and formulation information.';
 if(has('nutrition','nutritional','calorie','protein','carb','fat')) return 'Nutritional information is not currently stored in this assistant. Please check the product packaging or contact our team for verified details.';
 if(has('allergen','allergy','gluten','egg','contains')) return 'Allergen information should be verified from the specific product packaging or directly with our team before purchase or consumption.';
 if(has('shelf life','expiry','expiration','best before')) return 'Shelf-life and best-before information should be checked on the specific product packaging or confirmed with our team.';
 if(has('recipe','recipes','how to serve','serving idea')) return 'For serving ideas, please explore the PureVelo website content. For product-specific preparation, follow the instructions on the pack.';
 if(has('sample','product sample','send sample')) return 'For product sample requests, please submit a Business Enquiry with your company and market details so our team can review the request.';
 if(has('catalog','catalogue','brochure')) return 'For a current product catalogue or business materials, please use the Business Enquiry form or email contact@purevelofood.com.';
 if(has('private label','oem','contract manufacturing','custom packaging')) return 'Private-label, OEM and custom-packaging capabilities are not confirmed in this assistant. Please send your requirements through the Business Enquiry form.';
 if(has('job','career','vacancy','employment','work for')) return 'Current vacancies are not listed in this assistant. You can contact contact@purevelofood.com for company-related enquiries.';
 if(has('website','official site','web site')) return 'You are on the official PureVelo website. You can browse our products and use the Business Enquiry section for commercial enquiries.';
 if(has('complaint','problem with product','quality issue','feedback')) return 'For product feedback or a quality concern, please contact contact@purevelofood.com with the product name and relevant details so the team can assist.';
 if(has('order online','buy online','shop online','purchase online','where to buy')) return 'Online retail purchasing information is not confirmed in this assistant. Please contact our team for current purchasing options.';
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
