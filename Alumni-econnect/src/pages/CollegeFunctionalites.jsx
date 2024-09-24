import React, { useState } from 'react';

const CollegeRegistration = () => {
  const [formValues, setFormValues] = useState({
    colleges: [
      {
        college_name: '',
        college_domain: '',
        college_code: '',
        establishment_year: '',
        admin_name: '',
      },
    ],
    contacts: [
      {
        number: '',
        email: '',
        authority: '',
      },
    ],
    accreditation: '',
    state: '',
    city: '',
    address: '',
    affiliated_university: '',
    nirf_ranking: '',
    social_media_links: {
      linkedin: '',
      facebook: '',
      instagram: '',
      twitter: '',
    },
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCollegeChange = (index, e) => {
    const { name, value } = e.target;
    const newColleges = [...formValues.colleges];
    newColleges[index][name] = value;
    setFormValues({ ...formValues, colleges: newColleges });
  };

  const addCollege = () => {
    setFormValues({
      ...formValues,
      colleges: [
        ...formValues.colleges,
        { college_name: '', college_domain: '', college_code: '', establishment_year: '', admin_name: '' },
      ],
    });
  };

  const removeCollege = (index) => {
    if (formValues.colleges.length > 1) {
      const newColleges = formValues.colleges.filter((_, i) => i !== index);
      setFormValues({ ...formValues, colleges: newColleges });
    }
  };

  const handleContactChange = (index, field, value) => {
    const newContacts = [...formValues.contacts];
    newContacts[index][field] = value;
    setFormValues({ ...formValues, contacts: newContacts });
  };

  const addContact = () => {
    setFormValues({
      ...formValues,
      contacts: [
        ...formValues.contacts,
        { number: '', email: '', authority: '' },
      ],
    });
  };

  const removeContact = (index) => {
    if (formValues.contacts.length > 1) {
      const newContacts = formValues.contacts.filter((_, i) => i !== index);
      setFormValues({ ...formValues, contacts: newContacts });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { colleges, contacts, accreditation, state, city, address, affiliated_university } = formValues;

    colleges.forEach((college, index) => {
      if (!college.college_name) newErrors[`college_name_${index}`] = 'College Name is required';
      if (!college.college_code) newErrors[`college_code_${index}`] = 'College Code is required';
      if (!college.establishment_year || isNaN(college.establishment_year)) newErrors[`establishment_year_${index}`] = 'Establishment Year must be numeric';
      if (!college.admin_name) newErrors[`admin_name_${index}`] = 'Admin Name is required';
    });

    if (!contacts.some(contact => contact.number || contact.email || contact.authority)) newErrors.contacts = 'At least one contact entry must be filled';
    if (!accreditation) newErrors.accreditation = 'Accreditation is required';
    if (!state) newErrors.state = 'State is required';
    if (!city) newErrors.city = 'City is required';
    if (!address) newErrors.address = 'Address is required';
    if (!affiliated_university) newErrors.affiliated_university = 'Affiliated University is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formValues);
      // Here you would typically send the data to your API
    }
  };

  return (
    <section className="bg-gray-100 p-6 mt-12">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">College Registration</h1>
        <p className="text-gray-600 mb-6 text-center">Fill in the details to register your college.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* College Details */}
          <h2 className="font-semibold text-2xl text-gray-700 mb-4">College Details</h2>
          {formValues.colleges.map((college, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
              <h3 className="font-semibold text-xl text-gray-700 mb-2">College {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`college_name_${index}`} className="block text-sm font-medium text-gray-700">College Name</label>
                  <input type="text" id={`college_name_${index}`} name="college_name" value={college.college_name} onChange={(e) => handleCollegeChange(index, e)} className="mt-1 w-full border rounded-md shadow-sm p-3 " required />
                  {errors[`college_name_${index}`] && <p className="text-red-600 text-sm">{errors[`college_name_${index}`]}</p>}
                </div>
                <div>
                  <label htmlFor={`college_code_${index}`} className="block text-sm font-medium text-gray-700">College Code</label>
                  <input type="text" id={`college_code_${index}`} name="college_code" value={college.college_code} onChange={(e) => handleCollegeChange(index, e)} className="mt-1 w-full border rounded-md shadow-sm p-3 " required />
                  {errors[`college_code_${index}`] && <p className="text-red-600 text-sm">{errors[`college_code_${index}`]}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`college_domain_${index}`} className="block text-sm font-medium text-gray-700">College Domain</label>
                  <input type="text" id={`college_domain_${index}`} name="college_domain" value={college.college_domain} onChange={(e) => handleCollegeChange(index, e)} className="mt-1 w-full border rounded-md shadow-sm p-3 " />
                </div>
                <div>
                  <label htmlFor={`establishment_year_${index}`} className="block text-sm font-medium text-gray-700">Establishment Year</label>
                  <input type="text" id={`establishment_year_${index}`} name="establishment_year" value={college.establishment_year} onChange={(e) => handleCollegeChange(index, e)} className="mt-1 w-full border rounded-md shadow-sm p-3 " required pattern="\d*" />
                  {errors[`establishment_year_${index}`] && <p className="text-red-600 text-sm">{errors[`establishment_year_${index}`]}</p>}
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor={`admin_name_${index}`} className="block text-sm font-medium text-gray-700">Admin Name</label>
                  <input type="text" id={`admin_name_${index}`} name="admin_name" value={college.admin_name} onChange={(e) => handleCollegeChange(index, e)} className="mt-1 w-full border rounded-md shadow-sm p-3 " required />
                  {errors[`admin_name_${index}`] && <p className="text-red-600 text-sm">{errors[`admin_name_${index}`]}</p>}
                </div>
              </div>
              {formValues.colleges.length > 1 && (
                <button type="button" onClick={() => removeCollege(index)} className="text-red-600 mt-2">Remove College</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addCollege} className="text-[#D27511] font-semibold">Add Another College</button>

          {/* Contact Details */}
          <h2 className="font-semibold text-2xl text-gray-700 mb-4">Contact Details</h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
            {formValues.contacts.map((contact, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-lg text-gray-700">Contact {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`contact_number_${index}`} className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input type="text" id={`contact_number_${index}`} value={contact.number} onChange={(e) => handleContactChange(index, 'number', e.target.value)} className="mt-1 w-full border rounded-md shadow-sm p-3 " />
                  </div>
                  <div>
                    <label htmlFor={`contact_email_${index}`} className="block text-sm font-medium text-gray-700">Contact Email</label>
                    <input type="email" id={`contact_email_${index}`} value={contact.email} onChange={(e) => handleContactChange(index, 'email', e.target.value)} className="mt-1 w-full border rounded-md shadow-sm p-3 " />
                  </div>
                  <div>
                    <label htmlFor={`contact_authority_${index}`} className="block text-sm font-medium text-gray-700">Contact Authority</label>
                    <input type="text" id={`contact_authority_${index}`} value={contact.authority} onChange={(e) => handleContactChange(index, 'authority', e.target.value)} className="mt-1 w-full border rounded-md shadow-sm p-3 " />
                  </div>
                </div>
                {formValues.contacts.length > 1 && (
                  <button type="button" onClick={() => removeContact(index)} className="text-red-600 mt-2">Remove Contact</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addContact} className="text-[#D27511] font-semibold">Add Another Contact</button>
          </div>

          {/* Additional Details */}
          <h2 className="font-semibold text-2xl text-gray-700 mb-4">Additional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="accreditation" className="block text-sm font-medium text-gray-700">Accreditation</label>
              <input type="text" id="accreditation" name="accreditation" value={formValues.accreditation} onChange={handleChange} className="mt-1 w-full border rounded-md shadow-sm p-3 " required />
              {errors.accreditation && <p className="text-red-600 text-sm">{errors.accreditation}</p>}
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
              <input type="text" id="state" name="state" value={formValues.state} onChange={handleChange} className="mt-1 w-full border rounded-md shadow-sm p-3" required />
              {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" id="city" name="city" value={formValues.city} onChange={handleChange} className="mt-1 w-full border rounded-md shadow-sm p-3 " required />
              {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" name="address" value={formValues.address} onChange={handleChange} className="mt-1 w-full border rounded-md shadow-sm p-3 " required />
              {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
            </div>
            <div>
              <label htmlFor="affiliated_university" className="block text-sm font-medium text-gray-700">Affiliated University</label>
              <input type="text" id="affiliated_university" name="affiliated_university" value={formValues.affiliated_university} onChange={handleChange} className="mt-1 w-full border rounded-md shadow-sm p-3 " required />
              {errors.affiliated_university && <p className="text-red-600 text-sm">{errors.affiliated_university}</p>}
            </div>
            <div>
              <label htmlFor="nirf_ranking" className="block text-sm font-medium text-gray-700">NIRF Ranking (optional)</label>
              <input type="text" id="nirf_ranking" name="nirf_ranking" value={formValues.nirf_ranking} onChange={handleChange} className="mt-1 w-full border rounded-md shadow-sm p-3 " />
            </div>
          </div>

          {/* Social Media Links */}
          <h2 className="font-semibold text-2xl text-gray-700 mb-4">Social Media Links (optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <input type="url" id="linkedin" name="linkedin" value={formValues.social_media_links.linkedin} onChange={(e) => setFormValues({ ...formValues, social_media_links: { ...formValues.social_media_links, linkedin: e.target.value } })} className="mt-1 w-full border rounded-md shadow-sm p-3 " />
            </div>
            <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">Facebook</label>
              <input type="url" id="facebook" name="facebook" value={formValues.social_media_links.facebook} onChange={(e) => setFormValues({ ...formValues, social_media_links: { ...formValues.social_media_links, facebook: e.target.value } })} className="mt-1 w-full border rounded-md shadow-sm p-3" />
            </div>
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram</label>
              <input type="url" id="instagram" name="instagram" value={formValues.social_media_links.instagram} onChange={(e) => setFormValues({ ...formValues, social_media_links: { ...formValues.social_media_links, instagram: e.target.value } })} className="mt-1 w-full border rounded-md shadow-sm p-3" />
            </div>
            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter</label>
              <input type="url" id="twitter" name="twitter" value={formValues.social_media_links.twitter} onChange={(e) => setFormValues({ ...formValues, social_media_links: { ...formValues.social_media_links, twitter: e.target.value } })} className="mt-1 w-full border rounded-md shadow-sm p-3 " />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button type="submit" className="bg-[#D27511] text-white py-2 px-4 rounded-md hover:bg-[#B7620C] transition duration-300">Submit Registration</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CollegeRegistration;
