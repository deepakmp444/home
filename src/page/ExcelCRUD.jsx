import React, { useEffect, useState } from "react";
import axios from "axios";
import { Offcanvas, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const ExcelCRUD = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    Id: "",
    Image: "",
    Title: "",
    Description: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 12;
  const pagesToShow = 4;

  const loadExcelData = async () => {
    try {
      const response = await axios.get("http://localhost:5003/api/data");
      setData(response.data);
    } catch (error) {
      console.error("Error loading data from backend:", error);
    }
  };

  useEffect(() => {
    loadExcelData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://localhost:5003/api/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setFormData((prev) => ({ ...prev, Image: response.data.imageUrl }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSave = async () => {
    const updatedData = [...data];
    if (editingId) {
      const index = updatedData.findIndex((item) => item.Id === editingId);
      updatedData[index] = { ...formData, Id: editingId };
    } else {
      const newItem = { ...formData, Id: uuidv4() }; // Generate a random ID
      updatedData.unshift(newItem);
    }
    setData(updatedData);
    setFormData({ Id: "", Image: "", Title: "", Description: "" });
    setEditingId(null);
    setShowOffcanvas(false);
    await updateExcelData(updatedData);
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.Id === id);
    setFormData({
      Id: itemToEdit.Id,
      Image: itemToEdit.Image || "",
      Title: itemToEdit.Title || "",
      Description: itemToEdit.Description || "",
    });
    setEditingId(id);
    setShowOffcanvas(true);
  };

  const handleAddNew = () => {
    setFormData({ Id: "", Image: "", Title: "", Description: "" });
    setEditingId(null);
    setShowOffcanvas(true);
  };

  const handleDelete = async (id) => {
    const updatedData = data.filter((item) => item.Id !== id);
    setData(updatedData);
    await updateExcelData(updatedData);
  };

  const updateExcelData = async (updatedData) => {
    try {
      await axios.post("http://localhost:5003/api/data", updatedData);
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const filteredData = data.filter((item) =>
    item.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startPage = Math.max(
    1,
    Math.min(
      totalPages - pagesToShow + 1,
      currentPage - Math.floor(pagesToShow / 2)
    )
  );
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="container mt-4">
      {/* Search bar */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <Form.Control
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="sm"
          style={{ maxWidth: "200px" }}
        />
        <Button variant="primary" onClick={handleAddNew} size="sm">
          Add New
        </Button>
      </div>

      <div className="row mt-4">
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <div key={item.Id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100">
                <img
                  src={item.Image}
                  alt="Card"
                  className="card-img-top"
                  height={200}
                  width={200}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.Title}</h5>
                  <p className="card-text">{item.Description}</p>
                  <Button
                    variant="secondary"
                    onClick={() => handleEdit(item.Id)}
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => handleDelete(item.Id)}
                    size="sm"
                  >
                    Delete
                  </Button>
                  <a
                    href={item.Image}
                    className="btn btn-outline-primary btn-sm ms-2"
                    target="_blank"
                    download
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No results found</p>
        )}
      </div>

      {/* Pagination controls */}
      {filteredData.length > 0 && (
        <div className="d-flex justify-content-end mt-3 mb-5">
          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "primary" : "outline-primary"}
              onClick={() => handlePageChange(page)}
              className="me-1"
            >
              {page}
            </Button>
          ))}
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="me-1"
          >
            {">"}
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {">>"}
          </Button>
        </div>
      )}

      {/* Offcanvas for Add/Edit Form */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {editingId ? "Edit Item" : "Add New Item"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {formData.Image && (
                <img
                  src={formData.Image}
                  alt="Preview"
                  className="mt-2"
                  style={{ width: "100%" }}
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleInputChange}
                placeholder="Enter title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>
              {editingId ? "Update" : "Add"}
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ExcelCRUD;
