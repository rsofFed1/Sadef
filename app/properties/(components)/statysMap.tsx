export const statusMap = {
  0: { label: "Pending", color: "bg-yellow-500", svg: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  1: { label: "Approved", color: "bg-green-600", svg: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M9 12l2 2l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  2: { label: "Sold", color: "bg-blue-600", svg: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  3: { label: "Rejected", color: "bg-red-600", svg: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  4: { label: "Archived", color: "bg-gray-500", svg: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )},
};

import { ReactNode } from "react";

type PropertyDetailProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
};

export const PropertyDetail = ({ icon, label, value }: PropertyDetailProps) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="text-sm text-gray-600">{label}:</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);

type DetailRowProps = {
  label: string;
  value: string | number | null | undefined;
};

export const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="flex justify-between items-center border-b pb-2">
    <span className="text-gray-600">{label}:</span>
    <span className="font-bold text-[#BDA25A]">{value || '-'}</span>
  </div>
);
