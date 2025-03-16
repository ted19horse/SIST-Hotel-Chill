import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Chill Haven Signature Collection",
    description: "Exclusive products featuring our signature scents and designs used throughout the hotel",
    image: "/placeholder.svg?height=600&width=800",
    slug: "signature-collection",
    featuredProducts: [
      { name: "Peaceful Moment Aroma Diffuser Set", price: 85 },
      { name: "Forest Retreat Candle Trio", price: 65 },
      { name: "Ultimate Chill Bath Salt & Soak Set", price: 55 },
      { name: "Chill Haven Logo Slippers", price: 45 },
      { name: "Chill Night Bedding Collection", price: "120-250" },
      { name: "Chill Comfort Premium Bathrobe", price: 95 },
    ],
  },
  {
    id: 2,
    name: "Healing & Wellness Collection",
    description: "Mindfully selected products to enhance your wellbeing and relaxation practice",
    image: "/placeholder.svg?height=600&width=800",
    slug: "healing-wellness",
    featuredProducts: [
      { name: "Peace of Mind Meditation Kit", price: 75 },
      { name: "Chill Yoga Mat & Accessories", price: 90 },
      { name: "Deep Rest Sleep Kit", price: 65 },
      { name: "Forest Gift Aromatherapy Oil Set", price: 70 },
      { name: "Lake Tranquility Massage Stones", price: 45 },
      { name: "Chill Moment Stress Relief Ball", price: 25 },
    ],
  },
  {
    id: 3,
    name: "Eco & Sustainable Lifestyle Products",
    description: "Earth-friendly products that promote sustainability and mindful living",
    image: "/placeholder.svg?height=600&width=800",
    slug: "eco-sustainable",
    featuredProducts: [
      { name: "Earth Rest Eco-friendly Tumbler", price: 35 },
      { name: "Pure Rest Organic Soap & Shampoo Bars", price: 40 },
      { name: "Nature's Touch Bamboo Toothbrush & Comb Set", price: 30 },
      { name: "Traveling Peace Reusable Travel Kit", price: 55 },
      { name: "Forest Breath Air-purifying Mini Plant", price: 45 },
      { name: "Eco Chill Organic Cotton Tote Bag", price: 25 },
    ],
  },
  {
    id: 4,
    name: "Food & Beverage for Relaxation",
    description: "Curated selections of teas, treats, and beverages from our dining venues",
    image: "/placeholder.svg?height=600&width=800",
    slug: "food-beverage",
    featuredProducts: [
      { name: "Chill Tea Signature Tea Collection", price: 45 },
      { name: "Nature's Sweetness Organic Honey & Jam Set", price: 50 },
      { name: "Simple Joy Premium Chocolate & Cookie Set", price: 40 },
      { name: "Peaceful Evening Wine Selection", price: "40-120" },
      { name: "Chill Moment Herbal Tea Blends", price: 35 },
      { name: "Forest Gift Nuts & Dried Fruit Set", price: 30 },
    ],
  },
  {
    id: 5,
    name: "Room-Specific Custom Collections",
    description: "Tailored products designed to match the experience of each room type",
    image: "/placeholder.svg?height=600&width=800",
    slug: "room-collections",
    featuredProducts: [
      { name: "Chill Comfort & Harmony Room Collection", price: "50-100" },
      { name: "Chill Serenity Room Collection", price: "80-150" },
      { name: "Chill Family Suite Collection", price: "90-180" },
      { name: "Chill Lake & Ultimate Chill Suite Collection", price: "150-300" },
    ],
  },
  {
    id: 6,
    name: "Memories & Collectible Items",
    description: "Special keepsakes to remember your Chill Haven experience",
    image: "/placeholder.svg?height=600&width=800",
    slug: "memories-collectibles",
    featuredProducts: [
      { name: "Chill Moment Photo Frame", price: 45 },
      { name: "Chill Haven Dream Miniature", price: 65 },
      { name: "Peaceful Moment Art Poster & Postcard Set", price: 35 },
      { name: "Seasonal Peace Limited Edition Collection", price: "40-100" },
      { name: "Chill Guy Character Merchandise", price: "15-45" },
      { name: "Rest Memory Diary & Pen Set", price: 55 },
    ],
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Categories</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore our thoughtfully curated collections designed to bring the Chill Haven experience into your everyday
            life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64">
                <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-neutral-600 mb-4">{category.description}</p>

                <div className="space-y-2 mb-6">
                  <p className="font-medium text-sm text-neutral-700">Featured Products:</p>
                  <ul className="space-y-1">
                    {category.featuredProducts.slice(0, 3).map((product, index) => (
                      <li key={index} className="flex justify-between text-sm">
                        <span className="text-neutral-600">{product.name}</span>
                        <span className="font-medium">${product.price}</span>
                      </li>
                    ))}
                  </ul>
                  {category.featuredProducts.length > 3 && (
                    <p className="text-sm text-neutral-500">+ {category.featuredProducts.length - 3} more products</p>
                  )}
                </div>

                <Link href={`/gift-shop/category/${category.slug}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Shop Now
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

