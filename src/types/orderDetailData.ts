export interface ProductData {
  data: {
    id: number;
    name: string;
    price: {
      basicPrice: number;
      sellingPrice: number;
      discountRate: number;
    };
    imageURL: string;
    brandInfo: {
      id: number;
      name: string;
      imageURL: string;
    };
  };
}

export interface ProductDetailData {
  data: {
    description: string;
    announcements: {
      name: string;
      value: string;
      displayOrder: number;
    }[];
  };
}

export interface ProductWishCount {
  data: {
    wishCount: number;
    isWished: boolean;
  };
}
export interface ProductHighlightReview {
  data: {
    totalCount: number;
    reviews: {
      id: string;
      authorName: string;
      content: string;
    }[];
  };
}
