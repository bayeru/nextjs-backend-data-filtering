import { ICar } from "@/common/types";
import Filters from "@/components/ui/Filters";
import Pagination from "@/components/ui/Pagination";
import { useBrands, useCars } from "@/hooks/swr-hooks";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();  
  
  const {
    brands,
  } = useBrands();

  const {
    data,
  } = useCars(router.asPath);

  let rows = <></>;
  let numPages = 0;
  let page = 1;
  
  if (data) {

    const cars = data[0].cars;
  
    rows = cars.map((car: ICar) => {
      return (
        <tr key={car._id} className="bg-white">
          <td className="px-6 py-4">{car.brand}</td>
          <td className="px-6 py-4">{car.model}</td>
          <td className="px-6 py-4">{car.color}</td>
          <td className="px-6 py-4">{car.year}</td>
          <td className="px-6 py-4">{car.price}</td>
          <td className="px-6 py-4">{car.available ? "Available" : "Not Available"}</td>
        </tr>
      );
    });

    numPages = data[0].metadata[0].count / 10;
    page = data[0].metadata[0].page;

  }

	let brandsOptions:{
		[key: string]: {
			label: string;
			value: boolean;
		}
	} | null = null;

  if (brands) {

    brandsOptions = {};

    for (let i = 0; i < brands.length; i++) {
      brandsOptions[brands[i]] = {
        label: brands[i],
        value: false
      }
    }
  }

	return (
		<>
			<div className="flex flex-col justify-between pl-4 pr-4 pt-8 pb-8 grow h-full text-sm">
				<div className="flex max-w-[68.75rem] w-full mx-auto">
          <Filters brandOptions={brandsOptions} />
					{/* <DropdownFilter title={"Model"} className="ml-2" />
					<DropdownFilter title={"Color"} className="ml-2" />
					<DropdownFilter title={"Year"} className="ml-2" />
					<DropdownFilter title={"Price"} className="ml-2" /> */}
				</div>
				<div className="max-w-[68.75rem] mx-auto w-full bg-white shadow-lg rounded-md flex flex-col overflow-hidden mt-8">
					<table className="divide-y divide-slate-200">
						<thead className="bg-slate-50 text-slate-500 uppercase text-xs border-slate-200 text-left">
							<tr>
								<th className="px-6 py-4 whitespace-nowrap font-semibold">Brand</th>
								<th className="px-6 py-4 whitespace-nowrap font-semibold">Model</th>
								<th className="px-6 py-4 whitespace-nowrap font-semibold">Color</th>
								<th className="px-6 py-4 whitespace-nowrap font-semibold">Year</th>
								<th className="px-6 py-4 whitespace-nowrap font-semibold">Price</th>
								<th className="px-6 py-4 whitespace-nowrap font-semibold">Availability</th>
							</tr>
						</thead>
						<tbody className="text-slate-500 divide-y divide-slate-200">{rows}</tbody>
					</table>
				</div>
				<Pagination page={page} totalPages={numPages} />
			</div>
		</>
	);
}
