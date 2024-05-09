import React, { useState } from 'react';
import './form.css'

const initialState = {
  username: '',
  email: '',
  password: '',
  mobile: '',
  image: null,
  gender: '',
  addresses: [
    {
      address: '',
      city: '',
      state: '',
      pincode: '',
      isPrimary: true
    }
  ]
};

const statesList = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index][name] = value;
    setFormData({
      ...formData,
      addresses: updatedAddresses
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });
  };

  const handlePrimaryAddressChange = (index) => {
    const updatedAddresses = formData.addresses.map((address, idx) => ({
      ...address,
      isPrimary: idx === index
    }));
    setFormData({
      ...formData,
      addresses: updatedAddresses
    });
  };

  const addAddress = () => {
    if (formData.addresses.length < 5) {
      setFormData({
        ...formData,
        addresses: [
          ...formData.addresses,
          {
            address: '',
            city: '',
            state: '',
            pincode: '',
            isPrimary: false
          }
        ]
      });
    }
  };

  const removeAddress = (indexToRemove) => {
    setFormData({
      ...formData,
      addresses: formData.addresses.filter((address, index) => index !== indexToRemove)
    });
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    setFormData(initialState);
  };

  return (
    <div className='outer-container'>

    <div className="container">

      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit} >

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username :</label>
          <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email :</label>
          <input type="email" className="form-control" id="email" name="email"  placeholder="Ex: abc@gmail.com" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password :</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">Mobile :</label>
          <input type="text" className="form-control" id="mobile" name="mobile" placeholder="only digits" value={formData.mobile} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} accept="image/*" required />
        </div>

        {/*Gender field  */}
        <div className="mb-3">
          <label className="form-label">Gender :</label>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={formData.gender === 'male'} onChange={handleChange} required />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div> 
        </div>
          

        {/* Address fields */}
        {formData.addresses.map((address, index) => (
          <div key={index}>
            <div className="mb-3">
              <label htmlFor={`address${index}`} className="form-label">Address</label>
              <input type="text" className="form-control" id={`address${index}`} name="address" value={address.address} onChange={(e) => handleAddressChange(e, index)} required />
            </div>

            <div className="mb-3">
              <label htmlFor={`city${index}`} className="form-label">City</label>
              <input type="text" className="form-control" id={`city${index}`} name="city" value={address.city} onChange={(e) => handleAddressChange(e, index)} required />
            </div>

            {/* State Field */}
            <div className="mb-3">
              <label htmlFor={`state${index}`} className="form-label">State</label>
              <select className="form-select" id={`state${index}`} name="state" value={address.state} onChange={(e) => handleAddressChange(e, index)} required>
                <option value="">Select State</option>
                {statesList.map((state, idx) => (
                  <option key={idx} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Pincode */}
            <div className="mb-3">
              <label htmlFor={`pincode${index}`} className="form-label">Pincode</label>
              <input type="text" className="form-control" id={`pincode${index}`} name="pincode" value={address.pincode} onChange={(e) => handleAddressChange(e, index)} required />
            </div>

            {/* Address Field */}

            <div className="form-check mb-3">
              <input className="form-check-input" type="radio" id={`primaryAddress${index}`} name="primaryAddress" checked={address.isPrimary} onChange={() => handlePrimaryAddressChange(index)} />
              <label className="form-check-label" htmlFor={`primaryAddress${index}`}>
                Primary Address
              </label>
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="radio" id={`primaryAddress${index}`} name="primaryAddress" checked={address.isPrimary} onChange={() => handlePrimaryAddressChange(index)} />
              <label className="form-check-label" htmlFor={`primaryAddress${index}`}>
                Permanent Address
              </label>
            </div>
      
            {index > 0 && (
              <div className='mb-3'>
                <button type="button" className="btn btn-danger" onClick={() => removeAddress(index)}>Remove Address</button>
              </div>  
            )}
           
          </div>
          
        ))}

        <button type="button" className="btn btn-primary mb-3" onClick={addAddress}>Add Address</button>
        <br/>

        <button type="submit" className="btn btn-success">SUBMIT</button>
      </form>
    </div>
    </div>
  );
};

export default RegistrationForm;
