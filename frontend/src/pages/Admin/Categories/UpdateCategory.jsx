import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateCategory() {
  const [form] = Form.useForm();
  const formLayout = "vertical";
  const params = useParams();
  const navigate = useNavigate();
  const categoryId = params.id;
  
  // console.log(categoryId);

  const getCategoryById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`);
      if(response.ok){
        const data =await response.json();
        if(data){
          form.setFieldsValue({
            name : data.name,
            img : data.img,
            _id : categoryId
          });
          console.log(form.getFieldsValue())
        }
      }
    } catch (error) {
      console.log("Sunucu hatası...",error)
    }
  }
  useEffect(() => {
    getCategoryById();
  },[])
  const updateCategory = async (values) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        console.log("Kategori güncelleme işlemi başarılı...");
        navigate("/admin/categories");
      } else {
        console.log("Kategori güncelleme işlemi başarısız...");
      }
    } catch (error) {
      console.log("Sunucu hatası...", error);
    }
  };
  return (
    <>
      <h2>Update Category Panel</h2>
      <br /><hr /><br />
      <Form
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onFinish={updateCategory}
      >
        <Form.Item label="Category Name" name="name">
          <Input placeholder="Category name enter..." />
        </Form.Item>
        <Form.Item label="Category Image" name="img">
          <Input placeholder="Category image enter..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateCategory;
