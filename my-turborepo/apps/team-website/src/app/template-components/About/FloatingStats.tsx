const FloatingStats = () => {
return(
    <div className="w-full flex flex-wrap gap-6 text-3xl text-datablue font-bold justify-center px-6 lg:w-1/2">
        <div className="flex circle justify-center items-center">
            <p className="p-4 text-center">
                $10k Prizes
            </p>
        </div>
        <div className="flex circle justify-center items-center">
            <p className="text-center p-4">
                600 Hackers
            </p>
        </div>
        <div className="flex circle justify-center items-center">
            <p className="p-4 text-center">
                20 Schools
            </p>
        </div>
        <div className="flex circle justify-center items-center">
            <p className="p-4 text-center">
                48 Hours
            </p>
        </div>
        <div className="flex circle justify-center items-center">
            <p className="p-4 text-center">
                100 Projects
            </p>
        </div>
    </div>
);
};

export default FloatingStats;