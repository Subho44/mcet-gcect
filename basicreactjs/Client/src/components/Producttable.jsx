import React from 'react'

const Producttable = () => {
    const products = [
        { id: 1, name: "laptop", location: "kolkata", price: 89000 },
        { id: 1, name: "laptop", location: "kolkata", price: 89000 },
        { id: 1, name: "laptop", location: "kolkata", price: 89000 },
        { id: 1, name: "laptop", location: "kolkata", price: 89000 },
        { id: 1, name: "laptop", location: "kolkata", price: 89000 },
        { id: 1, name: "laptop", location: "kolkata", price: 89000 },
        { id: 1, name: "laptop", location: "kolkata", price: 89000 },
        { id: 1, name: "laptop", location: "kolkata", price: 89000 },
        { id: 1, name: "laptop", location: "kolkata", price: 89000 },
        { id: 1, name: "laptop", location: "kolkata", price: 89000 },

    ]
    return <>
        <div>
            <table border={2}>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Price</th>
                </tr>

                {products.map(x => (
                    <tr>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.location}</td>
                        <td>{x.price}</td>
                    </tr>
                ))}

            </table>
        </div>

    </>
}

export default Producttable