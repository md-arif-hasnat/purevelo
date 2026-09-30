const KNOWLEDGE = `
You are the PureVelo website assistant for Velora Grain & Foods. Be concise, friendly and professional.
Only answer from the verified business information below. Never invent prices, MOQ, certifications, ingredients, shipping terms, stock, delivery times, export countries, or commercial commitments. If information is not listed, say you do not have that confirmed information and direct the visitor to the Business Enquiry form or contact@purevelofood.com.
PureVelo is manufactured by Velora Grain & Foods in Baramati, Maharashtra, India.
Brand positioning: Inspired by Italy. Crafted in India.
Business enquiries are welcomed from distributors, importers, wholesalers, retailers, supermarkets and food-service buyers.
Contact: contact@purevelofood.com, +91 75880 34596.
Address: Industrial Drive, Plot No. E-128/E, Baramati MIDC, Bhigwan Road, Baramati, District Pune, Maharashtra 413133, India.
Products displayed: Farfalle; Macaroni; Rigatoni; Linguine; Cavatappi; Premium Fusilli; Premium Conchiglie; Premium Penne; Mini Spaghetti; Roasted Pasta Vermicelli; Roasted Chutki Shemai.
Known pack sizes: Farfalle 250g; Macaroni 250g; Rigatoni 250g; Linguine 250g; Cavatappi 250g; Premium Fusilli 250g; Premium Conchiglie 250g; Premium Penne 250g; Mini Spaghetti 200g; Roasted Pasta Vermicelli 200g; Roasted Chutki Shemai 350g.
Known cooking times: Farfalle 12 min; Linguine 8 min; Cavatappi 10 min; Premium Fusilli 15 min; Premium Conchiglie 15 min; Premium Penne 15 min.
Reply in the language the visitor uses when practical. For sales or distribution requests, encourage the Business Enquiry form.
`;

export async function POST(request) {
  try {
    if (!process.env.OPENAI_API_KEY) return Response.json({error:'AI chat is not configured yet.'},{status:503});
    const body=await request.json();
    const messages=Array.isArray(body.messages)?body.messages.slice(-8):[];
    if(!messages.length) return Response.json({error:'Message required.'},{status:400});
    const input=[{role:'system',content:KNOWLEDGE},...messages.map(m=>({role:m.role==='assistant'?'assistant':'user',content:String(m.content||'').slice(0,500)}))];
    const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',input,max_output_tokens:250})});
    const data=await r.json();
    if(!r.ok) return Response.json({error:'AI service unavailable.'},{status:502});
    const reply=(data.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('\n').trim();
    return Response.json({reply:reply||'Please contact contact@purevelofood.com for assistance.'});
  } catch {
    return Response.json({error:'Unable to process chat.'},{status:500});
  }
}
