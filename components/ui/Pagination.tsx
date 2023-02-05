import Link from "next/link";
import { useRouter } from "next/router";

interface PaginationProps {
	page: number;
	totalPages: number;
}

const Pagination = ({ page, totalPages }: PaginationProps) => {
	
	const router = useRouter();
	let pages: any[] = [];
	let params = '';

	// When router is ready, get query params and remove page param along with the ? or / at the beginning
	if (router.isReady) {
		const searchParams = new URLSearchParams(router.asPath.replace(/^\/?\??/, "&"));
		searchParams.delete("page");
		params = searchParams.toString();
	}

	const renderPageLink = (page: number) => {

		return (
			<li key={page}>
				<Link
					href={params !== '' ? `/?page=${page}&${params}` : `/?page=${page}`}
					className="inline-flex px-4 py-2 text-slate-600 hover:bg-slate-50 border border-slate-200 bg-white items-center justify-center rounded-tl rounded-bl"
				>
					{page}
				</Link>
			</li>
		);

	};
	
	const renderDots = (key:string) => {
		return (
			<li key={key}>
				<span className="inline-flex px-4 py-2 border border-slate-200 bg-white items-center justify-center text-slate-600 font-medium">
					...
				</span>
			</li>
		);
	};
	
	const renderCurrentPage = (page: number) => {
		return (
			<li key={page}>
				<span className="inline-flex px-4 py-2 border border-slate-200 bg-indigo-500 items-center justify-center text-white">
					{page}
				</span>
			</li>
		);
	};

	// Render first page link (Only if current page is more than 2)
	if (page > 2) {
		pages.push(renderPageLink(1));

		// Render dots if current page is more than 3
		if (page > 3) {
			pages.push(renderDots("prev-dots"));
		}
	}

	// Render previous page link
	if (page - 1 > 0) {
		pages.push(renderPageLink(page - 1));
	}

	// Render current page
	pages.push(renderCurrentPage(page));

	// Render next page link
	if (page + 1 <= totalPages) {
		pages.push(renderPageLink(page + 1));
	}

	// Render last page link (Only if current page is less than totalPages - 2)
	if (page + 3 <= totalPages + 1) {
		// Render dots if current page is less than totalPages - 3
		if (page + 3 <= totalPages) {
			pages.push(renderDots("next-dots"));
		}

		pages.push(renderPageLink(totalPages));
	}

	return (
		<nav className="flex mx-auto mt-8 text-slate-500">
			<Link
				href={params !== '' ? `/?page=${page - 1}&${params}` : `/?page=${page - 1}`}
				className={`inline-flex px-3 py-2 justify-center items-center mr-2 bg-white shadow-sm border border-slate-200 rounded ${page === 1 ? "opacity-50 pointer-events-none" : ""}`}
			>
				<svg className="w-4 h-4 fill-slate-500" viewBox="0 0 16 16">
					<path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z"></path>
				</svg>
			</Link>
			<ul className="inline-flex -space-x-px shadow-sm">{pages}</ul>
			<Link
				href={params !== '' ? `/?page=${page + 1}&${params}` : `/?page=${page + 1}`}
				className={`inline-flex px-3 py-2 justify-center items-center ml-2 bg-white shadow-sm border border-slate-200 rounded ${page === totalPages ? "opacity-50 pointer-events-none" : ""}`}
			>
				<svg className="w-4 h-4 fill-slate-500" viewBox="0 0 16 16">
					<path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z"></path>
				</svg>
			</Link>
		</nav>
	);
};

export default Pagination;
