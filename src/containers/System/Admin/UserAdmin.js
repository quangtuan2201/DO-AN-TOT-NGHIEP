import React, { memo, useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// // import ReactPaginate from "react-paginate";
// import "./UserAdmin.scss";

// // Example items, to simulate fetching from another resources.
// // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// function Items({ currentItems }) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item, index) => (
//           <div key={index}>
//             <h3>Item #{item.firstName}</h3>
//           </div>
//         ))}
//     </>
//   );
// }

// function PaginatedItems({ items, itemsPerPage }) {
//   const [itemOffset, setItemOffset] = useState(0);

//   const endOffset = itemOffset + itemsPerPage;
//   const currentItems = items.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(items.length / itemsPerPage);

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % items.length;

//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <Items currentItems={currentItems} />
//       <ReactPaginate
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={3}
//         marginPagesDisplayed={2}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         pageClassName="page-item"
//         pageLinkClassName="page-link"
//         previousClassName="page-item"
//         previousLinkClassName="page-link"
//         nextClassName="page-item"
//         nextLinkClassName="page-link"
//         breakLabel="..."
//         breakClassName="page-item"
//         breakLinkClassName="page-link"
//         containerClassName="pagination"
//         activeClassName="active"
//         renderOnZeroPageCount={null}
//       />
//     </>
//   );
// }

// Add a <div id="container"> to your HTML to see the component rendered.
function UserAdmin({ items, itemsPage }) {
  //{ items = items2, itemsPage }
  // return <PaginatedItems items={items} itemsPerPage={10} />;
  return "";
}

export default memo(UserAdmin);
