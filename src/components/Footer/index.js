import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="footer-header">
        COVID19<span className="footer-span">INDIA</span>
      </h1>
      <p className="footer-description">
        we stand with everyone fighting on the front lines
      </p>
      <div className="footer-icons-container">
        <img
          src="https://res.cloudinary.com/dzvuzkc62/image/upload/v1640933975/Vector_x4hyse.png"
          alt="vector"
          className="footer-icon-vector"
        />
        <img
          src="https://res.cloudinary.com/dzvuzkc62/image/upload/v1640934167/instagram_mix43t.png"
          alt="instagram"
          className="footer-icon-instagram"
        />
        <img
          src="https://res.cloudinary.com/dzvuzkc62/image/upload/v1640934115/path3611_niy7ez.png"
          alt="twitter"
          className="footer-icon-twitter"
        />
      </div>
    </div>
  )
}
