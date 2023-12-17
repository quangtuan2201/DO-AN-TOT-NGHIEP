import React, { memo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import "./UserAdmin.scss";

// Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const items2 = [
  {
    id: 1,
    name: "nguyen tuan anh",
  },
  {
    id: 2,
    name: "Trần Tuấn anh",
  },
  {
    id: 3,
    name: "Đào Đức anh",
  },
  {
    id: 4,
    name: "Trần Tú Đào",
  },
  {
    id: 5,
    name: "Nguyễn Ngọc Tú",
  },
  {
    id: 6,
    name: "Nguyễn Đức Anh",
  },
];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <div key={index}>
            <h3>Item #{item.firstName}</h3>
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ items, itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

// Add a <div id="container"> to your HTML to see the component rendered.
function UserAdmin({ items = items2, itemsPage }) {
  //{ items = items2, itemsPage }
  // console.log("items: ", items);
  // console.log("itemsPerPage: ", itemsPage);
  return <PaginatedItems items={items} itemsPerPage={4} />;
}

export default memo(UserAdmin);
