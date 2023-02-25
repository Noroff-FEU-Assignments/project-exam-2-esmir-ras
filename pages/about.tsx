export default function AboutPage() {
  return (
    <main className="mobile-width" style={{paddingTop:'1.5rem', marginTop:'0.5rem', width:'40vw', height:'80vh', background:'#1D1A27', borderRadius:'0.375rem'}}>
      <h1 className="text-3xl md:text-5xl lg:text-6xl text-center text-indigo-500 font-mono leading-tight drop-shadow-text" style={{color:'#fff'}}>
        Socialgram
      </h1>
      <p className="my-8 max-w-prose w-11/12 text-justify mx-auto">
        {
          "Welcome to Socialgram! A social media app designed specifically for students! We understand the importance of staying connected and engaged in the classroom, and that's why we've created a platform that makes it easy to share class materials, thoughts and have fun!."
        }
      </p>
      <p className="my-8 max-w-prose w-11/12 text-justify mx-auto">
        {
          'It was developed using NextJS, the React framework, TailwindCSS, MUI and lots of love!'
        }
      </p>
    </main>
  );
}
