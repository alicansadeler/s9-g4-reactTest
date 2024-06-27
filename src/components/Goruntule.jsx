import React from 'react';

const Goruntule = (props) => {
  const { ad, soyad, email, mesaj } = props.form;

  return (
    <div id="displayContainer">
      <h1>Gönderilen:</h1>

      {ad && (
        <p data-testid="firstnameDisplay">
          <strong>Ad: </strong>
          {ad}
        </p>
      )}
      {soyad && (
        <p data-testid="lastnameDisplay">
          <strong>Soyad: </strong>
          {soyad}
        </p>
      )}
      {email && (
        <p data-testid="emailDisplay">
          <strong>Email: </strong>
          {email}
        </p>
      )}
      {mesaj && (
        <p data-testid="messageDisplay">
          <strong>Mesaj: </strong>
          {mesaj}
        </p>
      )}
    </div>
  );
};

export default Goruntule;
