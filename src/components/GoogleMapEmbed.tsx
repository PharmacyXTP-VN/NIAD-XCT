export default function GoogleMapEmbed() {
  return (
    <div className="w-full h-[410px] md:h-[410px] rounded-none overflow-hidden shadow-xl border-0 z-0" style={{marginTop: 0, left: 0, transform: 'none', position: 'relative'}}>
      <iframe
        title="Google Map NIAD"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0123456789!2d105.526123456789!3d21.013456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345432123456789%3A0x123456789abcdef!2zTmdoaeG7h3UgTmlhZCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1680000000000!5m2!1svi!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
