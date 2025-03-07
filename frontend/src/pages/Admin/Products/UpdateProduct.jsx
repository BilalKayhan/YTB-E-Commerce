import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function UpdateProduct() {
    const [ categories, setCategories ] = useState([]);
    const [form] = Form.useForm();
    const formLayout = "vertical";
    const navigate = useNavigate();
    const colorOptions = ["Red","Green","Blue","Black","White","Brown"];
    const sizeOptions = ["xs","sm","m","l","xl","xxl"];
    const params = useParams();
    const productId = params.id;
    const getCategories = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/categories");
            if(response.ok){
                const data = await response.json();
                setCategories(data);
            }else{
                console.log("Kategori getirilemedi...");
            }
        } catch (error) {
            console.log("Sunucu hatası", error);
        }
      }

      const getProductById = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}`);
            if(response.ok){
                const data =await response.json();
                if(data){
                    form.setFieldsValue({
                        name : data.name,
                        images : data.images,
                        price : data.price,
                        description : data.description,
                        stock : data.stock,
                        discount : data.discount,
                        colors: data.colors,
                        sizes : data.sizes,
                        stockCode : data.stockCode,
                        category : data.category,
                        _id : productId
                    })
                    console.log(form.getFieldsValue())
                }
            }
        } catch (error) {
            console.log("Sunucu hatası...",error)
        }
      }

        useEffect(() => {
          getCategories();
          getProductById();
        },[]);
        const updateProduct = async (values) => {
            try {
              const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
              if (response.ok) {
                console.log("Ürün güncelleme işlemi başarılı...");
                navigate("/admin/products");
              } else {
                console.log("Ürün güncelleme işlemi başarısız...");
              }
            } catch (error) {
              console.log("Sunucu hatası...", error);
            }
          };
  return (
    <>
        <Form
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
          colors : ["Black","White"],
          sizes : ["m","l"]
        }}
        onFinish={updateProduct}
      >
        <Form.Item label="Product Name" name="name" rules={[{required : true, message : "Product name enter..."}]}>
          <Input placeholder="Product name enter..." />
        </Form.Item>
        <Form.Item label="Stock Code" name="stockCode" rules={[{required : true, message : "Product Stock Code enter..."}]}>
          <Input placeholder="Product Stock Code enter..." />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{required : true, message : "Product description enter..."}]}>
          <Input.TextArea placeholder="Product description enter..." rows={5} />
        </Form.Item>
        <Form.Item label="Product Images" name="images" rules={[{required : true, message : "Product images enter..."}]}>
          <Input.TextArea placeholder="Product images enter..." rows={5} />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required : true, message : "Product price enter..."}]}>
            <InputNumber />
        </Form.Item>
        <Form.Item label="Discount" name="discount" rules={[{ required : true, message : "Product discount enter..."}]}>
            <InputNumber />
        </Form.Item>
        <Form.Item label="Stock" name="stock" rules={[{ required : true, message : "Product stock enter..."}]}>
            <InputNumber />
        </Form.Item>
        <Form.Item label="Colors" name="colors" rules={[{required:true, message:"Product colors select..."}]}>
            <Checkbox.Group options={colorOptions}  />
        </Form.Item>
        {/* <Form.Item label="Sizes" name="sizes" rules={[{required : true, message : "Product sizes enter..."}]}>
          <Input.TextArea placeholder="Product sizes enter..." rows={5} />
        </Form.Item> */}
        <Form.Item label="Sizes" name="sizes" rules={[{required:true, message:"Product sizes select..."}]}>
            <Checkbox.Group options={sizeOptions}  />
        </Form.Item>
        <Form.Item label="Categories" name="category" rules={[{required:true, message:"Select a category"}]}>
            <Select placeholder="Select a category..." >
                {
                    categories.map(category => (
                        <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>
                    ))
                }
            </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default UpdateProduct