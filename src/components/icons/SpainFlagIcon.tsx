export default function SpainFlagIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="mr-2 h-4 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3 2"
    >
      <path fill="#C60B1E" d="M0 0h3v2H0z" />
      <path fill="#FFC400" d="M0 .5h3v1H0z" />
    </svg>
  );
}
