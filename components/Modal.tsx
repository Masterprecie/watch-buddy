interface TrailerModalProps {
  isOpen: boolean;
  trailerUrl: string | null;
  onClose: () => void;
}

const TrailerModal: React.FC<TrailerModalProps> = ({
  isOpen,
  trailerUrl,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div
        className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-1 text-gray-600 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>
        {trailerUrl ? (
          <iframe
            className="w-full rounded-lg"
            height="315"
            src={trailerUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-center text-gray-700">Loading trailer...</p>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
