import { useState } from "react";
import { motion } from "framer-motion";
import galleryImage1 from "../web pic/1.jpg";
import galleryImage2 from "../web pic/2.jpg";
import galleryImage3 from "../web pic/3.jpg";
import galleryImage4 from "../web pic/4.jpg";
import galleryImage5 from "../web pic/5.jpg";
import galleryImage6 from "../web pic/6.jpg";
import galleryVideo1 from "../web vid/1.mp4";
import galleryVideo2 from "../web vid/2.mp4";
import galleryVideo3 from "../web vid/3.mp4";

const heroImage =
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=2200&q=80";

const galleryImages = [
  {
    src: galleryImage1,
    alt: "Wedding couple portrait",
  },
  {
    src: galleryImage2,
    alt: "Bride and groom smiling",
  },
  {
    src: galleryImage3,
    alt: "Wedding ceremony moments",
  },
  {
    src: galleryImage4,
    alt: "Wedding detail and decor",
  },
  {
    src: galleryImage5,
    alt: "Wedding candid photo",
  },
  {
    src: galleryImage6,
    alt: "Bride walking with flowers",
  },
];

const videoGallery = [
  {
    src: galleryVideo1,
    alt: "Wedding video cover 1",
  },
  {
    src: galleryVideo2,
    alt: "Wedding video cover 2",
  },
  {
    src: galleryVideo3,
    alt: "Wedding video cover 3",
  },
];

const initialForm = {
  name: "",
  email: "",
  weddingDate: "",
  location: "",
  story: "",
};

export default function App() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const formPayload = {
        ...formData,
        _subject: `Wedding Inquiry - ${formData.name}`,
        _template: "table",
      };

      const response = await fetch("https://formsubmit.co/ajax/abhishek.manikpuri1999@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
      });

      if (!response.ok) {
        throw new Error("Booking request failed");
      }

      const message = [
        "New Wedding Inquiry",
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Wedding Date: ${formData.weddingDate || "Not provided"}`,
        `Location: ${formData.location || "Not provided"}`,
        `Story: ${formData.story || "Not provided"}`,
      ].join("\n");

      const whatsappUrl = `https://wa.me/917067141895?text=${encodeURIComponent(message)}`;

      setSubmitMessage("Your inquiry has been sent successfully. A WhatsApp chat is ready to open.");
      setWhatsappUrl(whatsappUrl);
      setFormData(initialForm);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send your inquiry right now.";
      setSubmitMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#f8f5f0] text-[#3f372f]">
      <section className="relative isolate min-h-screen overflow-hidden">
        <motion.img
          src={heroImage}
          alt="Wedding couple laughing on a beach at sunset"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-14 pt-8 text-white sm:px-10">
          <header className="flex items-center justify-between border-b border-white/35 pb-6">
            <p className="text-xl tracking-[0.18em] sm:text-2xl">ABG PHTOGRAPHY</p>
            <nav className="hidden items-center gap-8 text-sm tracking-[0.16em] uppercase md:flex">
              <a href="#portfolio" className="transition hover:text-white/75">
                Portfolio
              </a>
              <a href="#experience" className="transition hover:text-white/75">
                Experience
              </a>
              <a href="#inquire" className="transition hover:text-white/75">
                Inquire
              </a>
            </nav>
          </header>

          <div className="flex flex-1 items-center">
            <motion.div
              className="max-w-2xl space-y-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <p className="text-sm tracking-[0.2em] uppercase text-white/85">Wedding Photography Studio</p>
              <h1 className="text-4xl leading-tight sm:text-5xl">Timeless wedding stories with calm, editorial direction.</h1>
              <p className="max-w-xl text-base text-white/90 sm:text-lg">
                Inspired by your reference style: warm tones, refined composition, and emotional moments preserved with intention.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#inquire"
                  className="border border-white bg-white px-6 py-3 text-sm font-medium tracking-wide text-[#40372f] transition hover:bg-transparent hover:text-white"
                >
                  Reserve Your Date
                </a>
                <a
                  href="#portfolio"
                  className="border border-white/70 px-6 py-3 text-sm font-medium tracking-wide transition hover:border-white hover:bg-white/15"
                >
                  View Portfolio
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <h2 className="text-3xl tracking-wide">Recent Love Stories</h2>
        <p className="mt-3 max-w-2xl text-base text-[#6c6158]">
          A clean gallery built around natural light, genuine expressions, and quiet luxury.
        </p>
        <div className="mt-10 columns-1 gap-5 md:columns-2 lg:columns-3">
          {galleryImages.map((image, index) => (
            <motion.figure
              key={image.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="mb-5 break-inside-avoid overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                title={image.alt}
                className="pointer-events-none block h-auto w-full"
                loading="lazy"
              />
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
        <h2 className="text-3xl tracking-wide">Video Gallery</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {videoGallery.map((video, index) => (
            <motion.figure
              key={video.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="overflow-hidden"
            >
              <video
                src={video.src}
                title={video.alt}
                className="block h-auto w-full cursor-pointer"
                playsInline
                preload="metadata"
                onMouseEnter={(event) => {
                  event.currentTarget.muted = true;
                  void event.currentTarget.play();
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.pause();
                  event.currentTarget.currentTime = 0;
                }}
                onTouchStart={(event) => {
                  event.currentTarget.muted = false;
                  void event.currentTarget.play();
                }}
                onTouchEnd={(event) => {
                  event.currentTarget.pause();
                  event.currentTarget.currentTime = 0;
                }}
                onTouchCancel={(event) => {
                  event.currentTarget.pause();
                  event.currentTarget.currentTime = 0;
                }}
                onClick={(event) => {
                  const videoElement = event.currentTarget;
                  videoElement.muted = false;
                  void videoElement.play();
                }}
              />
            </motion.figure>
          ))}
        </div>
      </section>

      <section id="experience" className="bg-[#efe7dc] px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl tracking-wide">The Experience</h2>
          <p className="mt-3 max-w-2xl text-[#6c6158]">
            Every wedding is guided by a simple process so you can stay present while your story is captured beautifully.
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {["Plan", "Photograph", "Deliver"].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <p className="text-sm tracking-[0.2em] text-[#8a7a6e] uppercase">{`0${index + 1}`}</p>
                <h3 className="mt-2 text-2xl">{step}</h3>
                <p className="mt-3 text-[#6c6158]">
                  {step === "Plan" && "Discovery call, timeline guidance, and location planning tailored to your day."}
                  {step === "Photograph" && "Calm documentary coverage blended with artful portrait direction."}
                  {step === "Deliver" && "A refined online gallery and heirloom albums designed to last generations."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="inquire" className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <h2 className="text-3xl tracking-wide">Inquire About Your Date</h2>
        <p className="mt-3 max-w-2xl text-[#6c6158]">
          Share your wedding details and receive a custom collection guide within 48 hours.
        </p>
        <motion.form
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="mt-10 border border-[#d9cec0] bg-white/80 p-8"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span>Name</span>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="w-full border border-[#d8ccbe] bg-white px-4 py-3 outline-none transition focus:border-[#9f8a77]"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@email.com"
                required
                className="w-full border border-[#d8ccbe] bg-white px-4 py-3 outline-none transition focus:border-[#9f8a77]"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span>Wedding Date</span>
              <input
                name="weddingDate"
                type="date"
                value={formData.weddingDate}
                onChange={handleChange}
                className="w-full border border-[#d8ccbe] bg-white px-4 py-3 outline-none transition focus:border-[#9f8a77]"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span>Location</span>
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="City / Venue"
                className="w-full border border-[#d8ccbe] bg-white px-4 py-3 outline-none transition focus:border-[#9f8a77]"
              />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span>Your Story</span>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleChange}
                placeholder="Tell us about your wedding vision"
                rows={4}
                required
                className="w-full border border-[#d8ccbe] bg-white px-4 py-3 outline-none transition focus:border-[#9f8a77]"
              />
            </label>
          </div>

          {submitMessage ? (
            <p className="mt-4 text-sm text-[#3f372f]">{submitMessage}</p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="border border-[#3f372f] bg-[#3f372f] px-6 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-transparent hover:text-[#3f372f] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </button>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-[#25D366] bg-[#25D366] px-6 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-transparent hover:text-[#25D366]"
              >
                Chat on WhatsApp
              </a>
            ) : null}
          </div>
        </motion.form>
      </section>
    </main>
  );
}
