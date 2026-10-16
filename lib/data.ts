export const nav = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export const services = [
  {
    tag: "Fresh", title: "Home", accent: "Refresh.",
    text: "Experience the ultimate expert cleaning — creating spaces where comfort and productivity thrive.",
    image: "/images/home.jpg",
    alt: "Bright living room with a rose velvet armchair and brass floor lamp, freshly cleaned",
    badge: { value: 2, suffix: "×", label: "Deep Cleaning" }, flip: false,
  },
  {
    tag: "Regular", title: "Office", accent: "Cleaners.",
    text: "The cleaning team that cares — experts in creating pristine homes and productive workspaces.",
    image: "/images/office.jpg",
    alt: "Sunlit home office with an oak desk, leather chair and green plants, professionally cleaned",
    badge: { value: 24, suffix: "/7", label: "Maintenance" }, flip: true,
  },
];

export const stats: { value: number; suffix: string; decimals?: number; label: string }[] = [
  { value: 5, suffix: "K", label: "Customers" },
  { value: 4.5, suffix: "K", decimals: 1, label: "Repeat" },
  { value: 99, suffix: "%", label: "Satisfaction" },
];

export type Point = { title: string; text?: string };
export const pro: { tag: string; title: string; text: string; points: Point[] } = {
  tag: "Efficient",
  title: "Professional Cleaning For Every Occasion",
  text: "Whether you're maintaining a pristine workspace, or simply keeping your home in top shape, our services are designed to meet all your needs.",
  points: [
    { title: "Regular cleaning", text: "For regular maintenance, our services are tailored to keep your living spaces immaculate." },
    { title: "Deep cleaning", text: "For a deeper, more detailed clean, we tackle built-up dirt and hard-to-reach areas to leave your space feeling refreshed." },
    { title: "Move-in/out cleaning", text: "Make every move easier with a thorough clean that prepares your space for its next chapter." },
  ],
};

export const testimonials = [
  { quote: "Clean Office, Happy Team! We've received nothing but compliments from both staff and clients on how clean and organized our office is.", name: "John Doe", role: "Tech Global Co.", initials: "JD" },
  { quote: "Stress-free and spotless! I have never been more impressed with a cleaning service! It feels amazing to come home to a clean house.", name: "Jane Peterson", role: "Home Owner", initials: "JP" },
  { quote: "Professional and detailed! Our office has never looked better. The cleaners are punctual and attentive. Great value and service!", name: "Carlo Martinez", role: "Innovate Group", initials: "CM" },
  { quote: "Reliable every single week. Our lobby sparkles and visitors notice. Booking and rescheduling takes seconds.", name: "Ana Roy", role: "Studio Nine", initials: "AR" },
];

export const posts = [
  { title: "Guide To Keeping Your Home Spotless", category: "Cleaning tips", image: "/images/caddy.jpg", alt: "Cleaning caddy with spray bottle, brush, sponge, towels and a lemon on a stone counter", href: "#blog" },
  { title: "Keep Your Office Clean For Productivity", category: "Office care", image: "/images/blue-office.jpg", alt: "Blue-walled office with a walnut desk, shelves and framed art", href: "#blog" },
];

export const faqs = [
  { q: "What areas do you cover?", a: "We cover homes and offices across the city and nearby suburbs. Share your postcode in the quote form to confirm." },
  { q: "Do I need to provide supplies?", a: "No. Our team brings professional equipment and supplies for every visit." },
  { q: "Can I schedule services?", a: "Yes. Choose one-off, weekly, or monthly visits and reschedule any time." },
  { q: "Are your products safe?", a: "We use eco-friendly products that are safe for kids, pets, and shared workspaces." },
  { q: "How do I make payment?", a: "Pay by card or bank transfer after each visit, or set up a monthly invoice." },
];
