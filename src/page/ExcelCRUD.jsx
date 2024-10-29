import React, { useEffect, useState } from "react";
import axios from "axios";
import { Offcanvas, Button, Form } from "react-bootstrap";

const ExcelCRUD = () => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    Image: "",
    Title: "",
    Description: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const itemsPerPage = 12;
  const pagesToShow = 4;

  // Load data from the server
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

  // Handle input change for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save or update data
  const handleSave = async () => {
    const updatedData = [...data];
    if (editingIndex >= 0) {
      updatedData[editingIndex] = formData; // Update existing item
    } else {
      updatedData.push(formData); // Add new item
    }
    setData(updatedData);
    setFormData({ Image: "", Title: "", Description: "" });
    setEditingIndex(-1);
    setShowOffcanvas(false); // Close offcanvas after saving
    await updateExcelData(updatedData);
  };

  // Edit item: open form with current data in offcanvas
  const handleEdit = (index) => {
    const itemToEdit = data[index];
    setFormData({
      Image: itemToEdit.Image || "",
      Title: itemToEdit.Title || "",
      Description: itemToEdit.Description || "",
    });
    setEditingIndex(index);
    setShowOffcanvas(true); // Open offcanvas
  };

  // Delete item
  const handleDelete = async (index) => {
    const updatedData = data.filter((_, i) => i !== index); // Filter out the item to delete
    setData(updatedData);
    await updateExcelData(updatedData); // Update backend
  };

  // Update data on the backend
  const updateExcelData = async (updatedData) => {
    try {
      await axios.post("http://localhost:5003/api/data", updatedData);
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Pagination controls
  const handlePageChange = (page) => setCurrentPage(page);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate page range for pagination buttons
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
      <div className="row mt-4">
        {currentData.map((item, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <img src={item.Image} alt="Card" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{item.Title}</h5>
                <p className="card-text">{item.Description}</p>
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleEdit((currentPage - 1) * itemsPerPage + index)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() =>
                    handleDelete((currentPage - 1) * itemsPerPage + index)
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="d-flex justify-content-end mt-3 mb-5">
        {/* <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          First
        </Button>
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button> */}
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

      {/* Offcanvas for Add/Edit Form */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {editingIndex >= 0 ? "Edit Item" : "Add New Item"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="Image"
                value={formData.Image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
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
              {editingIndex >= 0 ? "Update" : "Add"}
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ExcelCRUD;