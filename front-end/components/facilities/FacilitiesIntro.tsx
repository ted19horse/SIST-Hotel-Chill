import Image from "next/image"

export default function FacilitiesIntro() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Resort Facilities</h2>
          <p className="text-xl text-primary mb-6">Complete your healing journey with our premium amenities</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            At Chill Haven Resort & Spa, our facilities are thoughtfully designed to enhance your healing journey. Each
            space is created with the perfect balance of luxury, comfort, and tranquility to nurture your mind, body,
            and spirit. From our state-of-the-art wellness center to our serene nature zones, every facility offers a
            unique experience to complement your stay.
          </p>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="relative h-[60vh] rounded-xl overflow-hidden mt-12">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Chill Haven Resort Facilities"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-3xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Healing Philosophy</h3>
              <p className="text-lg">
                "We believe that true healing comes from a harmonious balance of physical wellness, mental peace, and
                spiritual connection. Our facilities are designed to support this holistic approach, providing spaces
                where you can reconnect with yourself and nature."
              </p>
              <p className="mt-2 text-white/80">- Wellness Director, Chill Haven Resort & Spa</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Holistic Wellness</h3>
            <p className="text-neutral-600">
              Our facilities are designed to nurture your physical, mental, and emotional wellbeing through a variety of
              healing experiences.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 2v1"></path>
                <path d="M12 21v-1"></path>
                <path d="M4.93 4.93l.7.7"></path>
                <path d="M18.36 18.36l.7.7"></path>
                <path d="M2 12h1"></path>
                <path d="M21 12h-1"></path>
                <path d="M4.93 19.07l.7-.7"></path>
                <path d="M18.36 5.64l.7-.7"></path>
                <circle cx="12" cy="12" r="4"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Nature Connection</h3>
            <p className="text-neutral-600">
              We integrate natural elements throughout our facilities to help you reconnect with the healing power of
              nature.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Personalized Experience</h3>
            <p className="text-neutral-600">
              From customized spa treatments to flexible activity spaces, our facilities adapt to your unique healing
              journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

