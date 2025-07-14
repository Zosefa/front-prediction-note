export const Loader = () => {
    return (
            <div className="fixed inset-0 bg-gray-100/70 dark:bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
            <div className="flex space-x-2">
                <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"></span>
                <span className="w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-4 h-4 bg-purple-300 rounded-full animate-bounce delay-200"></span>
            </div>
            <style>
                {`
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                `}
            </style>
        </div>
    );
}