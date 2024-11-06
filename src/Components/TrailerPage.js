// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "../styles/Main.css"; // Make sure to import the CSS file
// import Modal from "./Modal";

// export default function TrailerPage() {
//   const { id } = useParams();
//   const [trailerDetail, setTrailerDetail] = useState(null);
//   const [trailerKey, setTrailerKey] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const API_key = "a615c902f9f5dcd954afca90ba540a60";
//   const img_path = "https://image.tmdb.org/t/p/w500";
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchTrailerDetail() {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/movie/${id}?api_key=${API_key}`
//       );
//       const data = await response.json();
//       setTrailerDetail(data);
//     }
//     async function fetchTrailer() {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_key}`
//       );
//       const data = await response.json();
//       const trailer = data.results.find(
//         (video) => video.type === "Trailer" && video.site === "YouTube"
//       );
//       if (trailer) setTrailerKey(trailer.key);
//     }
//     fetchTrailerDetail();
//     fetchTrailer();
//   }, [id]);

//   function openModal() {
//     setIsModalOpen(true);
//   } // Function to open modal

//   function closeModal() {
//     setIsModalOpen(false);
//   } // Function to close modal

//   return (
//     <>
//       <div
//         className="trailer-header"
//         style={{
//           backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
//         }}
//       >
//         <div className="trailer-details-overlay">
//           <div className="trailer-details-content">
//             <h1>{trailerDetail.title}</h1>
//           </div>
//         </div>
//       </div>
//       <Modal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         trailerKey={trailerKey}
//       />
//     </>
//   );
// }
