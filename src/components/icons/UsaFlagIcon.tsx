export default function UsaFlagIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className="mr-2 h-4 w-5 rounded-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3">
      <rect width="5" height="3" fill="#fff" />
      <path d="M0,0.5 H5 M0,1.5 H5 M0,2.5 H5" stroke="#B22234" strokeWidth="0.5" />
      <rect width="2" height="1.5" fill="#3C3B6E" />
    </svg>
  );
}
