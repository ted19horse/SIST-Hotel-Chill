import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import AddToCartClient from '@/components/gift-shop/client/AddToCartClient';
import { getProductById, getProductsByCategory } from '@/lib/api/gift-shop';
import { Product } from '@/lib/types/gift-shop';
import { ChevronRight, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// 서버 컴포넌트에서 상품 정보 가져오기
async function getProduct(id: number): Promise<Product | null> {
  try {
    return await getProductById(id);
  } catch (error) {
    console.error('상품 정보를 가져오는 중 오류 발생:', error);
    return null;
  }
}

// 관련 상품 가져오기
async function getRelatedProducts(
  categoryId: number,
  currentProductId: number
): Promise<Product[]> {
  try {
    const products = await getProductsByCategory(categoryId);
    // 현재 상품을 제외한 같은 카테고리의 상품을 최대 4개까지 반환
    return products.filter((product) => product.id !== currentProductId).slice(0, 4);
  } catch (error) {
    console.error('관련 상품을 가져오는 중 오류 발생:', error);
    return [];
  }
}

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = parseInt(params.id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, productId);

  return (
    <main className="min-h-screen">
      {/* 페이지 상단 배너 */}
      <div className="relative h-[30vh] bg-neutral-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1920')",
            opacity: 0.6,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">상품 상세</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link href="/gift-shop" className="hover:underline">
                기프트샵
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>{product.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 상세 정보 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 상품 이미지 */}
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.images[0] || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNewArrival && (
                    <Badge className="bg-green-500 text-white">신상품</Badge>
                  )}
                  {product.isLimitedEdition && (
                    <Badge className="bg-amber-500 text-white">한정판</Badge>
                  )}
                </div>
              </div>

              {/* 추가 이미지가 있는 경우 썸네일로 표시 */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded overflow-hidden">
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 상품 정보 */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

              <div className="mb-4">
                {product.isDiscounted && product.discountPrice ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">
                      ₩{product.discountPrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₩{product.price.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-primary">
                    ₩{product.price.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="text-gray-600 mb-8">
                <p className="mb-4">{product.description}</p>
                <p className="mb-2">
                  <span className="font-medium">SKU:</span> {product.sku}
                </p>
                <p className="mb-2">
                  <span className="font-medium">재고:</span>{' '}
                  {product.stock > 0 ? `${product.stock}개 남음` : '품절'}
                </p>
              </div>

              <Suspense fallback={<div>장바구니 로딩 중...</div>}>
                <AddToCartClient product={product} />
              </Suspense>

              <div className="border-t border-gray-200 mt-8 pt-8">
                <h3 className="font-bold text-lg mb-4">공유하기</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 관련 상품 */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">함께 구매하는 상품</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  href={`/gift-shop/products/${relatedProduct.id}`}
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={relatedProduct.images[0] || '/placeholder.svg'}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2 line-clamp-1">{relatedProduct.name}</h3>
                    <p className="text-primary font-bold">
                      ₩{(relatedProduct.discountPrice || relatedProduct.price).toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
