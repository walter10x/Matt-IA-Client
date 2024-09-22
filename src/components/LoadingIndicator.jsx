const LoadingIndicator = () => (
    <div className="flex items-center justify-center h-8">
        <div className="bg-gray-300 p-2 rounded-lg flex space-x-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
    </div>
);