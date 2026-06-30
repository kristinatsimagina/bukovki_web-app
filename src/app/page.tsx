import Hero from "@/components/Hero";
import ForWhom from "@/components/ForWhom";
import WhoWeAre from "@/components/WhoWeAre";
import HowItWorks from "@/components/HowItWorks";
import EmailForm from "@/components/EmailForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <ForWhom />
      <WhoWeAre />
      <HowItWorks />
      <section id="waitlist" className="flex flex-col items-center justify-center py-24 px-6 bg-white">
        <h2
          className="text-3xl lg:text-4xl text-center text-gray-900 mb-4"
          style={{ fontFamily: "'Made Barista', serif" }}
        >
          Хотите попробовать первыми?
        </h2>
        <p className="text-lg text-gray-500 text-center mb-8 max-w-md">
          Оставьте email — пришлём ссылку на бесплатный доступ, как только откроемся.
        </p>
        <EmailForm />
      </section>
    </main>
  );
}
