import {
  PackagePlus,
  LayoutDashboard,
  ListChecks,
  SquarePen,
  Users,
} from "lucide-react";

export const reviewsData = [
  {
    avatar: "/images/reviews/avatar-1.png",
    name: "Richard Thompson",
    review:
      "Delicious! Quick delivery, hot and fresh. A taste explosion in every bite. Highly recommend!",
    rating: 4.3,
  },
  {
    avatar: "/images/reviews/avatar-2.png",
    name: "Sarah Johnson",
    review:
      "Yum! Best flavors ever. Fast service, great portions. A culinary delight at your doorstep!",
    rating: 4,
  },
  {
    avatar: "/images/reviews/avatar-3.png",
    name: "Michael Carter",
    review:
      "Amazing! Satisfied my cravings. Fast and tasty. Will order again for sure. 5 stars!",
    rating: 4,
  },
  {
    avatar: "/images/reviews/avatar-4.png",
    name: "Emily Adams",
    review:
      "Mouthwatering! Timely delivery, perfect seasoning. A delightful treat without leaving home. Love it!",
    rating: 5,
  },
  {
    avatar: "/images/reviews/avatar-5.png",
    name: "Daniel Martinez",
    review:
      "Sensational! Burst of flavors. Quick and reliable. My go-to for a scrumptious meal!",
    rating: 4,
  },
  {
    avatar: "/images/reviews/avatar-6.png",
    name: "Sophia Lee",
    review:
      "Incredible! Flavor-packed joy. Lightning-fast delivery. A culinary masterpiece brought to my door. Wow!",
    rating: 5,
  },
];

export const sidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: 2,
    title: "All Food Items",
    path: "/foodItems",
    icon: <ListChecks size={20} />,
  },

  {
    id: 3,
    title: "All Users",
    path: "/users",
    icon: <Users size={20} />,
  },

  {
    id: 4,
    title: "All Orders",
    path: "/orders",
    icon: <PackagePlus size={20} />,
  },
  {
    id: 5,
    title: "Add Food Item",
    path: "/add-foodItem",
    icon: <SquarePen size={20} />,
  },
];
