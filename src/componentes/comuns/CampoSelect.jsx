import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function CampoSelect({ value, name, label, requerido, id, onchange,
    msgvalido, msginvalido, children }) {
    return (
        <FloatingLabel controlId={id} label={label} className="mb-3">
            <Form.Select required={requerido} name={name}
                value={value}
                onChange={onchange} >
                <option disable="true" value="">({msginvalido})</option>
                {children}
            </Form.Select>
            <Form.Control.Feedback>{msgvalido}</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                {msginvalido}
            </Form.Control.Feedback>
        </FloatingLabel>
    )
}

export default CampoSelect;