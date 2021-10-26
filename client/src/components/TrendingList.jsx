import React from 'react';
import styles from './TrendingList.module.css';


const TrendingList = (props) => {

    return (

        <div className="">
            <div className={styles.header}>
                <h1 className={styles.child}>Trending Food List </h1>
                <button onClick={props.toggleOtherSort} className={styles.button}>{props.buttonComment}</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Restaurant</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Total # of Purchased in Last 48hrs</th>
                    </tr>
                </thead>
                <tbody>
                    {props.trendinglist.map((item) => (
                        <tr>
                            <td>{item.Restaurant}</td>
                            <td>{item.ItemName}</td>
                            <td>{item.ProductPrice}</td>
                            <td>{item.Quantity}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>


    )
}

export default TrendingList;