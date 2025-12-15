import { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../service/firebase'; 

const AdminMessages = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const messagesCollection = collection(db, "contactMessages")
        const q = query(messagesCollection, orderBy('date', 'desc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(messagesList)
            setLoading(false)
        }, (err) => {
            console.error("Error al cargar mensajes:", err)
            setError("No se pudieron cargar los mensajes. Revisa la consola.")
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const markAsRead = async (messageId) => {
        try {
            const messageRef = doc(db, "contactMessages", messageId)
            await updateDoc(messageRef, {
                isRead: true
            })

        } catch (err) {
            console.error("Error al marcar como leído:", err)
            alert("Error al actualizar el estado del mensaje.")
        }
    }
    
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Fecha desconocida'
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
        return date.toLocaleDateString('es-AR', { 
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
        })
    }

    if (loading) return <Container className="my-5 text-center"><Spinner animation="border" /></Container>
    if (error) return <Container className="my-5"><Alert variant="danger">{error}</Alert></Container>

    return (
        <Container className="my-5">
            <h1 className="mb-4">Bandeja de Entrada de Contacto</h1>
            <p className="fw-bold">
                Mensajes sin leer: 
                <span className="text-danger ms-2">
                    {messages.filter(m => !m.isRead).length}
                </span>
            </p>
            
            {messages.length === 0 && <Alert variant="info">No hay mensajes de contacto.</Alert>}

            {messages.map((msg) => (
                <Card key={msg.id} className={`mb-3 ${!msg.isRead ? 'border-primary shadow-sm' : ''}`}>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <Card.Title className={!msg.isRead ? 'fw-bold text-primary' : ''}>
                                    {msg.subject} 
                                    {!msg.isRead && <span className="ms-3 badge bg-danger">¡NUEVO!</span>}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">De: {msg.name} ({msg.email})</Card.Subtitle>
                                <Card.Text className="mt-3">
                                    {msg.message}
                                </Card.Text>
                            </div>
                            <div className="text-end">
                                <small className="text-muted d-block mb-2">{formatDate(msg.date)}</small>
                                {!msg.isRead && (
                                    <Button 
                                        variant="outline-success" 
                                        size="sm" 
                                        onClick={() => markAsRead(msg.id)}
                                    >
                                        Marcar como Leído
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    )
}

export default AdminMessages