import { Table,Card } from "react-bootstrap";
const Producttable = ({funds}) => {



   
    return <>
        <Card className="m-4 p-4 shadow">
        <h3 className="mb-3">Mutual Fund List</h3>
            <Table striped bordered hover responsive>
                <tr>
                    <th>Fund Name</th>
                    <th>Fund Type</th>
                    <th>Amount Invested</th>
                    <th>Returns</th>
                    <th>Date</th>
                </tr>

                {funds.map(x => (
                    <tr key={x._id}>
                        <td>{x.fundname}</td>
                        <td>{x.fundtype}</td>
                        <td>{x.amountinvested}</td>
                        <td>{x.returns}</td>
                        <td>{new Date(x.date).toLocaleDateString()}</td>
                    </tr>
                ))}

            </Table>
        </Card>

    </>
}

export default Producttable