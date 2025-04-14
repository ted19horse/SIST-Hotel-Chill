import ScrollToTop from '@/components/common/home/ScrollToTop';
import Footer from '@/components/common/layout/Footer';
import Header from '@/components/common/layout/Header';
import ProductFilters from '@/components/gift-shop/ProductFilters';
import ShoppingCart from '@/components/gift-shop/ShoppingCart';
import CategoryProducts from '@/components/gift-shop/client/CategoryProducts';
import { getCategories } from '@/lib/api/gift-shop';
import { ProductCategory } from '@/lib/types/gift-shop';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 카테고리 정보 가져오기
async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  try {
    const categories = await getCategories();
    return categories.find((category) => category.slug === slug) || null;
  } catch (error) {
    console.error('카테고리 정보를 가져오는 중 오류 발생:', error);
    return null;
  }
}

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <ScrollToTop />
      <Header />

      {/* 페이지 상단 배너 */}
      <div className="relative h-[30vh] bg-neutral-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${category.image || '/placeholder.svg?height=800&width=1920'}')`,
            opacity: 0.6,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link href="/gift-shop" className="hover:underline">
                기프트샵
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>{category.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 카테고리 설명 */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
            {category.description}
          </p>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 사이드바 */}
          <div className="w-full md:w-1/4">
            <div className="sticky top-24">
              <ProductFilters />
              <ShoppingCart />
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="w-full md:w-3/4">
            <CategoryProducts categoryId={category.id} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
