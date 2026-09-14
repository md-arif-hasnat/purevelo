'use client';

import { useState } from 'react';

const products = [
  { name: 'Durum Wheat Vermicelli', image: 'https://images.unsplash.com/photo-1551462147-1c15e4852bbf?auto=format&fit=crop&fm=jpg&q=82&w=1200', note: 'Fine, versatile and made for everyday meals.' },
  { name: 'Premium Penne', image: 'https://images.unsplash.com/photo-1539267821515-9a48cb52c2bb?auto=format&fit=crop&fm=jpg&q=82&w=1200', note: 'Classic shape for sauces, bakes and salads.' },
  { name: 'Premium Fusilli', image: 'https://images.unsplash.com/photo-1745857465015-e24d6fb9ac00?auto=format&fit=crop&fm=jpg&q=82&w=1200', note: 'Spiral pasta that holds sauces beautifully.' },
  { name: 'Durum Wheat Semolina', image: 'https://images.unsplash.com/photo-1551185618-07fd482ff86e?auto=format&fit=crop&fm=jpg&q=82&w=1200', note: 'Premium grain ingredient for culinary applications.' },
];

export default function Home() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  async function submitContact(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setStatus('');
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not send your enquiry.');
      form.reset();
      setStatus('Thank you. Your enquiry has been sent successfully.');
    } catch (err) {
      setStatus(err.message || 'Could not send your enquiry. Please try again.');
    } finally {
      setSending(false);
    }
  }
  return <>
    <header className="site-header"><div className="nav-shell"><a className="brand" href="#home" aria-label="PureVelo home"><img src="/purevelo-logo.png" alt="PureVelo"/></a><nav className="main-nav"><a href="#home">Home</a><a href="#about">About Us</a><a href="#products">Products</a><a href="#quality">Quality & Manufacturing</a><a href="#b2b">B2B & Distribution</a><a href="#contact">Contact</a></nav><a className="nav-cta" href="#b2b">Become a Distributor</a></div></header>
    <main id="home">
      <section className="hero hero-banner" aria-label="PureVelo premium durum wheat foods"><img className="hero-banner-image" src="/hero.png" alt="PureVelo premium durum wheat foods"/></section>
      <section className="pillars shell" id="about"><div className="section-title"><p className="eyebrow navy">Our Promise</p><h2>Good Food Starts With Good Grain.</h2></div><div className="pillar-grid"><article><div className="icon">01</div><h3>Carefully Selected Grains</h3><p>We focus on appropriate grain quality and dependable raw materials for consistent products.</p></article><article><div className="icon">02</div><h3>Pure Ingredients</h3><p>Our range is built around durum wheat and straightforward food formulations.</p></article><article><div className="icon">03</div><h3>Hygienic Manufacturing</h3><p>Controlled production and careful handling support consistency from processing to packing.</p></article><article><div className="icon">04</div><h3>Made for Everyday Meals</h3><p>From quick breakfasts to family dinners, PureVelo fits naturally into modern kitchens.</p></article></div></section>
      <section className="products" id="products"><div className="shell"><div className="section-title"><p className="eyebrow navy">Our Range</p><h2>Discover the PureVelo Range</h2><p>From traditional favourites to versatile meal essentials, our range is designed for retail and commercial markets.</p></div><div className="product-grid">{products.map(p=><article className="product-card" key={p.name}><div className="product-image"><img src={p.image} alt={p.name}/></div><div className="product-body"><h3>{p.name}</h3><p>{p.note}</p><a href="#b2b">Request Product Details →</a></div></article>)}</div></div></section>
      <section className="quality" id="quality"><div className="shell quality-grid"><div><p className="eyebrow">Quality & Manufacturing</p><h2>Care at Every Stage.</h2><p>Our approach combines raw-material attention, controlled processing, hygiene and market-ready packaging.</p></div><ol><li><span>01</span><div><b>Selected Raw Materials</b><p>Quality-focused sourcing for the intended product.</p></div></li><li><span>02</span><div><b>Controlled Processing</b><p>Process discipline for consistency across batches.</p></div></li><li><span>03</span><div><b>Hygienic Handling</b><p>Clean handling practices through production and packing.</p></div></li><li><span>04</span><div><b>Market Ready</b><p>Prepared for retail, wholesale, distribution and export enquiries.</p></div></li></ol></div></section>
      <section className="b2b" id="b2b"><div className="shell b2b-grid"><div><p className="eyebrow">B2B & Distribution</p><h2>Bring PureVelo to Your Market.</h2><p>We welcome enquiries from distributors, importers, wholesalers, retailers, supermarkets and food-service buyers.</p><div className="b2b-tags"><span>Distributors</span><span>Importers</span><span>Wholesale</span><span>Retail</span><span>Food Service</span><span>Export</span></div><div className="b2b-contact"><p className="b2b-contact-label">Email</p><a href="mailto:contact@purevelofood.com">contact@purevelofood.com</a><a href="mailto:anish.jmc07@gmail.com">anish.jmc07@gmail.com</a><p className="b2b-contact-label phone-label">Phone / WhatsApp</p><a href="tel:+917588034596">+91 75880 34596</a></div></div><div className="contact-panel" id="contact"><h3>Business Enquiry</h3><p className="response-time">Usually replies within 48h</p><form onSubmit={submitContact}><div className="form-row"><input name="name" placeholder="Your name" required/><input name="company" placeholder="Company name" required/></div><div className="form-row"><input type="email" name="email" placeholder="Business email" required/><input type="text" inputMode="numeric" pattern="[0-9]*" name="phone" placeholder="Phone / WhatsApp" onInput={(e)=>{e.currentTarget.value=e.currentTarget.value.replace(/[^0-9]/g,'')}}/></div><div className="form-row"><input name="country" placeholder="Country"/><select name="businessType" defaultValue=""><option value="" disabled>Business type</option><option>Distributor</option><option>Importer</option><option>Wholesaler</option><option>Retailer</option><option>Food Service</option><option>Other</option></select></div><textarea name="message" placeholder="Tell us the products, pack sizes and estimated quantity you are interested in." required/><button className="btn gold full" type="submit" disabled={sending}>{sending?'Sending…':'Send Enquiry'}</button>{status&&<p className="form-status">{status}</p>}</form></div></div></section>
      <section className="contact-details"><div className="shell contact-details-grid"><div><p className="eyebrow navy">Contact</p><h2>Velora Grain & Foods</h2></div><address>Industrial Drive, Plot No. E-128/E,<br/>Baramati MIDC, Bhigwan Road, Baramati,<br/>District: Pune, Maharashtra - 413133, India</address></div></section>
    </main><footer><div className="shell footer-grid"><img className="footer-logo" src="/purevelo-logo.png" alt="PureVelo"/><p>Premium Durum Wheat Vermicelli & Pasta</p><p>© 2026 PureVelo · Velora Grain & Foods</p></div></footer>
  </>;
}
