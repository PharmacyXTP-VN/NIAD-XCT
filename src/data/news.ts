// File: src/data/news.ts
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string; // HTML từ CKEditor
}

export const newsList: NewsItem[] = [
  {
    id: "1",
    title: "Khai trương đại lý KIA mới tại Hà Nội",
    date: "2024-06-01",
    content: `<p><strong>KIA Việt Nam</strong> vừa khai trương đại lý mới tại Hà Nội, nâng tổng số đại lý trên toàn quốc lên 50.</p><ul><li>Địa chỉ: 123 Đường KIA, Quận Cầu Giấy, Hà Nội</li><li>Ưu đãi hấp dẫn cho khách hàng trong tháng khai trương</li></ul><p><img src="/images/news/test2.png" alt="Khai trương đại lý" style="max-width:100%" /></p>`,
  },
  {
    id: "2",
    title: "KIA ra mắt mẫu xe mới Carnival 2024",
    date: "2024-05-20",
    content: `<h2>Carnival 2024 - Đỉnh cao công nghệ</h2><p>Mẫu xe <em>Carnival 2024</em> được trang bị nhiều tính năng an toàn và tiện nghi vượt trội.</p><ul><li>Động cơ mạnh mẽ, tiết kiệm nhiên liệu</li><li>Hệ thống giải trí hiện đại</li></ul><p><img src="/images/news/test2.png" alt="Carnival 2024" style="max-width:100%" /></p>`,
  },
  {
    id: "3",
    title: "Ưu đãi mùa hè dành cho khách hàng KIA",
    date: "2024-05-10",
    content: `<p>Chương trình ưu đãi mùa hè dành cho khách hàng mua xe KIA từ 10/5 đến 30/6/2024:</p><ul><li>Giảm giá lên đến 50 triệu đồng</li><li>Tặng gói bảo dưỡng miễn phí 2 năm</li></ul>`,
  },
];
