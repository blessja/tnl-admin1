
import Acomp from './Alumni-comp';

const Page = () => {
  return (
    <div className="p-4 flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-9">
        <p className="text-2xl font-bold">Our Alumni Network:</p>
      </div>

      <Acomp />
    </div>
  );
};

export default Page;
