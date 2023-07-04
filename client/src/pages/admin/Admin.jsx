import { useEffect, useState } from 'react';
import './admin.css';
import { generalRequest, userRequest } from '../../httpService';
import Navbar from '../../components/navbar/Navbar';

const Admin = () => {
  // states for projects and values for manipulation
  const [products, setProducts] = useState([]);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState('');
  const [img, setImg] = useState('');
  const [base64Img, setBase64Img] = useState('');
  const [price, setPrice] = useState('');
  const [clicked, setIsClicked] = useState(false);
  const [save, setSave] = useState(false);
  // get user from Local storage
  const user = JSON.parse(localStorage.getItem('user'));

  //   get all projects
  const getProducts = async () => {
    try {
      const { data } = await generalRequest.get('/product');
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  //   get all Products when the page Reloads
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await generalRequest.get('/product');
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const handleImg = (e) => {
    setImg(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setBase64Img(reader.result);
      console.log('image');
    };
    reader.onerror = (error) => {
      console.log('Error', error);
    };
  };

  //   add any project
  const handleAddProduct = async (e) => {
    e.preventDefault();

    setIsClicked(false);
    if (
      title === '' ||
      desc === '' ||
      img === '' ||
      color === '' ||
      price === ''
    )
      return alert(`Please Fill All Fields To Add A Product`);

    try {
      const res = await userRequest.post('/product', {
        title,
        desc,
        img: base64Img,
        color,
        price,
      });
      // if succusfull get the Products
      if (res.data) {
        getProducts();
      }
      setIsClicked(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   render edit and save buttons conditionally
  const handleSave = () => {
    setSave(true);
    setIsClicked(true);
  };

  //   function to edit data
  const handleEdit = async (id) => {
    if (title === '' || desc === '' || price === '') {
      alert(`Please fill all fields or rewrite existing values!`);
      return;
    }
    try {
      const res = await userRequest.put(`/product/${id}`, {
        title,
        desc,
        price,
      });

      if (res.data) {
        getProducts();
      }
      setIsClicked(false);
      setSave(false);
    } catch (error) {}
  };

  //   function to delete data from the database
  const handleDelete = async (id) => {
    setIsClicked(false);
    try {
      const res = await userRequest.delete(`/product/${id}`);

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='hhome'>
        <div className='homeContainer'>
          <div className='homeTitle'>
            ADMIN PANEL : Alberta Welcomes You, {user?.username}!
          </div>
          <span>Edit one Product at a time </span>

          <div className='theHeaders'>
            <div className='homeTitle'>TITLE</div>
            <div className='desc'>DESCRIPTION</div>
            <div className='url'>PRICE</div>
          </div>

          {products?.map((product) => (
            <div className='projects' key={product._id}>
              <div className='pTitle'>{product.title}</div>

              <div className='description'>{product.desc}</div>

              <div className='pUrl'>{product.price}</div>

              <div className='buttonss'>
                {!save ? (
                  <button className='editBtn' onClick={handleSave}>
                    Edit
                  </button>
                ) : (
                  <button
                    className='saveBtn'
                    onClick={() => handleEdit(product._id)}
                  >
                    Save
                  </button>
                )}
                <button
                  className='deleteBtn'
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
              {clicked ? (
                <input
                  type='text'
                  className='editInput'
                  placeholder={product.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                ''
              )}
              {clicked ? (
                <input
                  type='text'
                  className='editInput'
                  placeholder={product.desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              ) : (
                ''
              )}

              {clicked ? (
                <input
                  type='text'
                  className='editInput'
                  placeholder={product.price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              ) : (
                ''
              )}
            </div>
          ))}

          <div className='addProject'>
            <span>Add a Product</span>
            <form onSubmit={handleAddProduct}>
              <input
                type='text'
                placeholder='title'
                className='inputs'
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type='text'
                className='inputs'
                placeholder='description'
                onChange={(e) => setDesc(e.target.value)}
              />
              <input
                type='file'
                className='inputs'
                onChange={handleImg}
                accept='image/*'
              />
              <input
                type='text'
                className='inputs'
                placeholder='price'
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type='text'
                className='inputs'
                placeholder='color'
                onChange={(e) => setColor(e.target.value)}
              />
              <button className='btnAdd' type='submit'>
                Add
              </button>
            </form>
          </div>
        </div>

        {base64Img ? (
          <img height={100} width={100} src={base64Img} alt='' />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Admin;
