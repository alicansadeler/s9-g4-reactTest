import React, { useState } from 'react';
import Goruntule from './Goruntule';

const formData = {
  ad: '',
  soyad: '',
  email: '',
  mesaj: '',
};

const errorData = {
  ad: '',
  soyad: '',
  email: '',
  mesaj: '',
};

const IletisimFormu = () => {
  const [displayData, setDisplayData] = useState(false);
  const [form, setForm] = useState(formData);
  const [errors, setErrors] = useState(errorData);

  const errorHandling = (fieldName, fieldValue) => {
    if (fieldName === 'ad' && fieldValue.length < 5)
      return `${fieldName} en az 5 karakter olmalıdır.`;

    const emailRegex = /(.*)@(.*)\.(.+)/g;
    if (fieldName === 'email' && !fieldValue.match(emailRegex))
      return `${fieldName} geçerli bir email adresi olmalıdır.`;

    if (fieldName !== 'mesaj' && fieldValue === '')
      return `${fieldName} gereklidir.`;

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitErrors = {};
    Object.keys(errors).forEach((field) => {
      submitErrors[field] = errorHandling(field, form[field]);
    });

    setErrors(submitErrors);

    const hasErrors =
      submitErrors.ad === '' &&
      submitErrors.soyad === '' &&
      submitErrors.email === '' &&
      submitErrors.mesaj === '';
    setDisplayData(hasErrors);
  };

  const handleChange = (e) => {
    const errorMessage = errorHandling(e.target.name, e.target.value);

    if (errorMessage !== '') {
      setDisplayData(false);
    }

    setErrors({
      ...errors,
      [e.target.name]: errorMessage,
    });

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="App">
      <h1>İletişim Formu</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ad">Ad*</label>
          <input
            onChange={handleChange}
            name="ad"
            value={form.ad}
            id="ad"
            placeholder="Adınız"
            data-testid="name-input"
          />
          {errors.ad && <p data-testid="error">Hata: {errors.ad}</p>}
        </div>

        <div>
          <label htmlFor="soyad">Soyad*</label>
          <input
            onChange={handleChange}
            id="soyad"
            name="soyad"
            value={form.soyad}
            placeholder="Soyadınız"
            data-testid="lastName-input"
          />
          {errors.soyad && <p data-testid="error">Hata: {errors.soyad}</p>}
        </div>

        <div>
          <label htmlFor="email">E-mail*</label>
          <input
            onChange={handleChange}
            id="email"
            name="email"
            value={form.email}
            placeholder="E-mail adresiniz"
            data-testid="email-input"
          />
          {errors.email && <p data-testid="error">Hata: {errors.email}</p>}
        </div>

        <div>
          <label htmlFor="mesaj">Mesaj</label>
          <input
            onChange={handleChange}
            name="mesaj"
            id="mesaj"
            value={form.mesaj}
            placeholder="Mesajınız (isteğe bağlı)"
            data-testid="message-input"
          />
          {errors.mesaj && <p data-testid="error">Error: {errors.mesaj}</p>}
        </div>

        {displayData && <Goruntule form={form} />}

        <button type="submit" data-testid="submit-button">
          Gönder
        </button>
      </form>
    </div>
  );
};

export default IletisimFormu;
