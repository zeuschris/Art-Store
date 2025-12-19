import { Button } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';

const SocialButtons = ({ onGoogle }) => (
    <>
      <div className="divider-container">
        <hr />
        <span className="divider-text text-muted">o</span>
      </div>
  
      <div className="d-grid gap-2">
        <Button 
          variant="light" 
          onClick={onGoogle}
          className="social-button border shadow-sm"
          style={{ backgroundColor: '#fff' }}
        >
          <FcGoogle size={22} /> Continuar con Google
        </Button>
      </div>
    </>
  )

export default SocialButtons;