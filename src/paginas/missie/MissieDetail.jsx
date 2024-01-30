import { useSearchParams } from 'react-router-dom'
import { useState, useEffect, Suspense } from 'react'
import { axiosUrls } from '../../api/axios'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { format, parse, isValid } from 'date-fns'
import useAuth from "../../hooks/useAuth"
import { loader } from "react-global-loader"
import Form from 'react-bootstrap/Form'
import { Button, Col, InputGroup, Row } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faTrashCan, faPlus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { GetMissieDagen, DateToDDMMYYYY ,HHMM_To_date,CompareDates} from '../../components/DatumFuncties'
import SuspenseParagraaf from '../../components/SuspenseParagraaf'
import EtappeComponent from './missiedetail/EtappeComponent'

const MissieDetail = () => {
  const showLoader = () => {
    loader.show();
  };

  const hideLoader = () => {
    loader.hide();
  };
  const [queryParam] = useSearchParams()
  const missieid = queryParam.get("missieid")
  const { auth } = useAuth()
  const currentUser = auth?.user
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true)
  const [allesInOrde, setAllesInOrde] = useState(true)
  const [foutmelding, setFoutmelding] = useState([])
  const [allesBewaard, setAllesBewaard] = useState(false)
  const [showModalSelectDeelnemer, setShowModalSelectDeelnemer] = useState(false)
  const [showModalSelectOrganisator, setShowModalSelectOrganisator] = useState(false)
  const [showModalEtappeToevoegen, setshowModalEtappeToevoegen] = useState(false)
  const [etappeTitel,setEtappeTitel] = useState('')
  const [etappeLocatie, setEtappeLocatie] = useState('')
  const [etappeStart,setEtappeStart]=useState('02:00')
  const [etappeEinde,setEtappeEinde] = useState('04:00')
  const [etappeRijen, setEtappeRijen] = useState([])

  const [missie, setMissie] = useState()
  const [isOrganisator, setIsOrganisator] = useState(false)
  const [isDeelnemer, setIsDeelnemer] = useState(false)

  const [titel, setTitel] = useState('')
  const [omschrijving, setOmschrijving] = useState('')
  const [locatie, setLocatie] = useState('')
  const [users, setUsers] = useState([])
  const [startdatum, setStartdatum] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [einddatum, setEinddatum] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [missiedagen, setMissiedagen] = useState([])
  const [missieEtappes,setMissieEtappes]=useState([])
  const [saveEdits, setSaveEdits] = useState(false)

  useEffect(() => {

    //showLoader();
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        // const response = await axiosPrivate.get(`${axiosUrls('MissieDetail')}?missieid=${missieid}`, {
        //   signal: controller.signal
        // });
        // console.log(response.data)
        // setData(response.data);
        let response = {
          data:
          {
            "details": {
              "id": 2,
              "titel": "titel",
              "omschrijving": "omschrijving",
              "startDatum": "2024-05-01T02:00:00+02:00",
              "eindDatum": "2024-05-03T02:00:00+02:00",
              "locatie": "locatie",
              "publiekZichtbaar": false
            },
            "gebruikers": [
              {
                "id": "78d06532-bc64-48be-974b-d4f4642d195a",
                "volledigeNaam": "Bjorn Leleu",
                "isDeelnemer": false,
                "isOrganisator": false
              },
              {
                "id": "2bc823e6-ebec-452e-b9a1-df59b9b2f481",
                "volledigeNaam": "Fabrice Hoornaert",
                "isDeelnemer": false,
                "isOrganisator": false
              },
              {
                "id": "5c117577-ed57-412c-bc8d-a0c19be059d0",
                "volledigeNaam": "Kenneth Carrein",
                "isDeelnemer": false,
                "isOrganisator": false
              },
              {
                "id": "f25cd2b4-0a22-4b09-a172-1d6a810bedd5",
                "volledigeNaam": "Kenneth Haspeel",
                "isDeelnemer": true,
                "isOrganisator": true
              },
              {
                "id": "d60bbf2b-1e64-4e63-a602-afbe9a9b9778",
                "volledigeNaam": "Kim Leleu",
                "isDeelnemer": false,
                "isOrganisator": false
              },
              {
                "id": "99defbaa-3721-47bd-9261-90ec3af6285c",
                "volledigeNaam": "Kobe Cannière ",
                "isDeelnemer": false,
                "isOrganisator": false
              },
              {
                "id": "90ee2e65-27cb-4c50-a298-8b1f05c77fc2",
                "volledigeNaam": "Maxime Verpoort",
                "isDeelnemer": false,
                "isOrganisator": false
              },
              {
                "id": "b18e9086-1e50-4bff-ab46-b8851c125eba",
                "volledigeNaam": "Sam Six",
                "isDeelnemer": false,
                "isOrganisator": false
              },
              {
                "id": "e385b1ad-9fa0-4ccd-a27b-38c64b2d5a8e",
                "volledigeNaam": "Sven Masschelein",
                "isDeelnemer": false,
                "isOrganisator": false
              },
              {
                "id": "a4bb6cd3-f8ad-468f-bc18-37ca7b93c4f1",
                "volledigeNaam": "Test Account",
                "isDeelnemer": true,
                "isOrganisator": true
              },
              {
                "id": "db204a5b-d190-47f8-8a28-59a3238a27f3",
                "volledigeNaam": "Timothy Volcke",
                "isDeelnemer": false,
                "isOrganisator": false
              },
              {
                "id": "36b58803-dd18-4a15-947d-6c90320aeee1",
                "volledigeNaam": "jurgen Vandamme",
                "isDeelnemer": true,
                "isOrganisator": true
              }
            ],
            "etappes": [
              {
                "id": 2,
                "titel": "Algemeen",
                "locatie": "",
                "startDatum": "2024-04-30T01:00:00+01:00",
                "eindDatum": "2024-04-30T01:00:00+01:00"
              }
            ]
          }

        }
        setMissiedagen(GetMissieDagen(response.data.details.startDatum, response.data.details.eindDatum))

        setTitel(response.data.details.titel)
        setOmschrijving(response.data.details.omschrijving)
        setStartdatum(format(response.data.details.startDatum, 'yyyy-MM-dd'))
        setEinddatum(format(response.data.details.eindDatum, 'yyyy-MM-dd'))
        setLocatie(response.data.details.locatie)
        setUsers(response.data.gebruikers)
        setMissieEtappes(response.data.etappes)
        response.data.gebruikers.forEach(u => {
          if (currentUser.id === u.id) {
            setIsOrganisator(u.isOrganisator)
            setIsDeelnemer(u.isDeelnemer)
            return
          }
          return
        })
        hideLoader()
      } catch (err) {
        console.error(err);
        hideLoader()
      }
    }
    getUsers();
    return () => {
      hideLoader()
      controller.abort();
    }
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const ToggleOrganisator = (userid) => {
    const list = users.map(obj => {
      if (obj.id === userid) {
        return { ...obj, isOrganisator: !obj.isOrganisator }
      }
      return obj
    })
    setUsers(list)
    setSaveEdits(true)
  }

  const ToggleDeelnemer = (userid) => {
    const list = users.map(obj => {
      if (obj.id === userid) {
        return { ...obj, isDeelnemer: !obj.isDeelnemer }
      }
      return obj
    })
    setUsers(list)
    setSaveEdits(true)
  }

  const handleCloseSelectDeelnemer = () => {
    setShowModalSelectDeelnemer(false)
  }
  const handleCloseSelectOrganisator = () => {
    setShowModalSelectOrganisator(false)
  }

  const handleBewaarNieuweEtappe = async ()=>{
    const controller = new AbortController();
    let datumStart = HHMM_To_date(etappedatum, starttijd)
    let datumEinde = HHMM_To_date(etappedatum, eindetijd)
    let data = {
        titel: titel,
        locatie: locatie,
        start: datumStart,
        einde: datumEinde,
        missied: missieid
    }
    const response = await axiosPrivate.post(`${axiosUrls('PostMissieEtappe')}`, data, {
        signal: controller.signal
    });
    console.log(response.data)
    return () => {
        controller.abort();
    }
  }
  const handleCloseEtappeToevoegen = ()=>{
    setshowModalEtappeToevoegen(false)
    setEtappeTitel('')
    setEtappeLocatie('')
    setEtappeStart('00:00')
    setEtappeEinde('00:00')
  }
  return (
    <>
      <h2>Details Missie: {titel} <Button variant="success" disabled={!saveEdits}><FontAwesomeIcon icon={faFloppyDisk} /> Bewaar</Button></h2>
        <form onSubmit={handleSubmit} className='mb-4'>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={2} sm={12}>Titel</Form.Label>
            <Col md={6} sm={12}>
              <Form.Control
                id="formTitel"
                type="text"
                onChange={(e) => { setTitel(e.target.value); setSaveEdits(true) }}
                readOnly={isOrganisator ? false : true}
                value={titel}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={2} sm={12}>Locatie</Form.Label>
            <Col md={6} sm={12}>
              <Form.Control
                id="formLocatie"
                type="text"
                onChange={(e) => { setLocatie(e.target.value); setSaveEdits(true) }}
                readOnly={isOrganisator ? false : true}
                value={locatie}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={2} sm={12}>Omschrijving</Form.Label>
            <Col md={6} sm={12}>
              <Form.Control as="textarea"
                id="formOmschrijving"
                rows={3}
                onChange={(e) => { setOmschrijving(e.target.value); setSaveEdits(true) }}
                readOnly={isOrganisator ? false : true}
                value={omschrijving}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={2} sm={12}>Startdatum</Form.Label>
            <Col md={6} sm={12}>

              <Form.Control
                id="formDatumStart"
                type="date"
                onChange={(e) => { setStartdatum(e.target.value); setSaveEdits(true) }}
                readOnly={isOrganisator ? false : true}
                value={startdatum}
              />

            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={2} sm={12}>Einddatum</Form.Label>
            <Col md={6} sm={12}>
              <Form.Control
                id="formDatumEinde"
                type="date"
                onChange={(e) => { setEinddatum(e.target.value); setSaveEdits(true) }}
                readOnly={isOrganisator ? false : true}
                value={einddatum}
              />
            </Col>
          </Form.Group>
          <hr />
          <Row className="mb-3">
            <Col md={2} sm={12} >Organisatoren <Button variant="info"><FontAwesomeIcon icon={faPlus} onClick={() => { setShowModalSelectOrganisator(true) }} /></Button></Col>
            <Col md={8} sm={12}>
              {
                users.filter((u) => { if (u.isOrganisator) { return true } else { return false } }).map((u) => (
                  <Button key={u.id} variant="danger" className='me-2 mb-2' onClick={() => { ToggleOrganisator(u.id) }}>
                    <FontAwesomeIcon icon={faTrashCan} /> {u.volledigeNaam}
                  </Button>
                ))
              }
            </Col>
          </Row>
          <hr />
          <Row className="mb-3">
            <Col md={2} sm={12} >
              Deelnemers <Button variant="info"><FontAwesomeIcon icon={faPlus} onClick={() => setShowModalSelectDeelnemer(true)} /></Button>
            </Col>
            <Col md={8} sm={12}>
              {
                users.filter((u) => { if (!u.isOrganisator && u.isDeelnemer) { return true } else { return false } })
                  .map((u) => (

                    <Button
                      key={u.id}
                      variant="info"
                      className='me-2 mb-2'
                      onClick={() => { ToggleDeelnemer(u.id) }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} /> {u.volledigeNaam}
                    </Button>

                  ))
              }
            </Col>
          </Row>
          <hr />
        </form>
        <h3>Etappes</h3>
        {
          missiedagen.map((dag, index) => (
            <div key={`div${index}`}>
              <div className="alert alert-primary" role="alert" key={`alert${index}`}>
              <Button key={`button${index}`} variant="info" className='me-2 mb-2' onClick={() => { setshowModalEtappeToevoegen(true) }}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                {
                  index === 0 ? ('Algemeen') : DateToDDMMYYYY(dag)
                }

              </div>
                <EtappeComponent etappelijst={missieEtappes.filter(etappe=>{return CompareDates(dag,etappe.startDatum)})} datum={dag} key={index} index={index} />
            </div>
          ))
        }
   
      <Modal show={showModalSelectDeelnemer} onHide={handleCloseSelectDeelnemer}>
        <Modal.Header closeButton>
          <Modal.Title>Deelnemer toevoegen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            users.map(user => (
              !user.isDeelnemer ?
                (
                  <Row key={user.id}>
                    <Col className="d-grid gap-2 pb-2">
                      <Button variant="success" onClick={() => { ToggleDeelnemer(user.id) }}>
                        <FontAwesomeIcon icon={faSquarePlus} /> {user.volledigeNaam}
                      </Button>
                    </Col>
                  </Row>
                )
                : ('')
            ))
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSelectDeelnemer}>
            Sluit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalSelectOrganisator} onHide={handleCloseSelectOrganisator}>
        <Modal.Header closeButton>
          <Modal.Title>Deelnemer toevoegen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            users.map(user => (
              (!user.isOrganisator && user.isDeelnemer) ?
                (
                  <Row key={user.id}>
                    <Col className="d-grid gap-2 pb-2">
                      <Button variant="success" onClick={() => { ToggleOrganisator(user.id) }}>
                        <FontAwesomeIcon icon={faSquarePlus} /> {user.volledigeNaam}
                      </Button>
                    </Col>
                  </Row>
                )
                : ('')
            ))
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSelectOrganisator}>
            Sluit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalEtappeToevoegen} onHide={handleCloseEtappeToevoegen}>
        <Modal.Header closeButton>
          <Modal.Title>Etappe toevoegen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit} className='mb-4'>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={2} sm={12}>Titel</Form.Label>
            <Col md={10} sm={12}>
              <Form.Control
                id="formTitel"
                type="text"
                onChange={(e) => { setEtappeTitel(e.target.value) }}
                value={etappeTitel}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={2} sm={12}>Locatie</Form.Label>
            <Col md={10} sm={12}>
              <Form.Control
                id="formLocatie"
                type="text"
                onChange={(e) => { setEtappeLocatie(e.target.value) }}
                value={etappeLocatie}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label  column md={2} sm={12}>Tijd Start</Form.Label>
            <Col md={10} sm={12}>

              <Form.Control
                id="formDatumStart"
                type="time"
                onChange={(e) => { setEtappeStart(e.target.value)}}
                value={etappeStart}
              />

            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={2} sm={12}>Tijd einde</Form.Label>
            <Col md={10} sm={12}>
              <Form.Control
                id="formDatumEinde"
                type="time"
                onChange={(e) => { setEtappeEinde(e.target.value)}}
                value={etappeEinde}
              />
            </Col>
          </Form.Group>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleBewaarNieuweEtappe}>
          <FontAwesomeIcon icon={faFloppyDisk} /> Bewaar
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default MissieDetail