import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = () => {};

  return (
    <div className="container my-5">
      <div className="card shadow-lg rounded">
        <img
          src="https://picsum.photos/1100/300"
          alt="A beautiful landscape"
          className="card-img-top rounded-top"
        />
        <div className="card-body">
          <h3 className="card-title text-center mb-3">Create Your Blog Post</h3>
          <div className="input-group mb-4">
            <span className="input-group-text bg-primary text-white">
              <IoIosAddCircleOutline size={25} />
            </span>
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Enter the title of your post"
              aria-label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-floating mb-4">
            <textarea
              className="form-control"
              placeholder="Write your blog content here..."
              id="content"
              style={{ height: "300px" }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <label htmlFor="content">Blog Content</label>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary btn-lg" onClick={handlePost}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
