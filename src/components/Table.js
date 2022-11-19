import React from 'react';

const Table = (props) => {

   const renderHeader = () => {
       let headerElement = ['No', 'name', 'image', 'review_count', 'transactions', 'rating',  'phone', 'url']

       return headerElement.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
       })
   }

   const renderBody = () => {
       return props.data && props.data.map(({ id, phone, name, review_count, image_url, transactions, rating, url }, index) => {
           return (
               <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>
                        <img src={image_url} alt='notFound' width={100} height={100} />
                    </td>
                    <td>{review_count}</td>
                    <td>
                    {
                        transactions.map((transaction, index) => {
                            return <p key={index}>{transaction}</p>
                        })
                    }
                    </td>
                    <td>{rating}</td>
                    <td>{phone}</td>
                    <td><a href={url}>click here</a></td>
               </tr>
           )
       })
   }

   return (
       <>
       { props.data.length !== 0 ? 
            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table> :
            <div className='row text-center'>
                <h2>No Data</h2>
            </div> 
       } 
       </>
   )
}

export default Table;