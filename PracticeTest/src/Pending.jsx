import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { MdOutlineDateRange } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDk3OTg4OTUsImV4cCI6MTc0MTM1NTg0Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoicmFkb3NsYXZAZWxpdHkuZGV2In0.YISa1YJkjHBbI7jXOOhIK6oVZT12jOaKuPdbG5MBsS3G7Ovi4bhcPNMhcEXjl13EjPk56EJgIjwuEpL-WvUYNdXO8eEZa4vPCKRhDnzYMnL1Jp5UL3F0nVgek0GtQEPfYDVc8vGY_xlKb681eRzJzsTq06z5x44s1POlGAvbJQcGS9FrGAMCaaMHhU4bX0I88W7zx7s2lJQnNQvcaCOL4cTi9hv5oeLlIYcZZGyXxCa6RYEuIPw1X1Mc2PvG84CBQUJSVGJEexeyrbrMK8e3XNo4hbPPL4s2nFp6j8hrwURH12gusLLVKX8J5SbWjsgdBV2wg2kZklvuTDsOZP7yow';

function Pending() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    axios.get('https://api.sunrero.space/order_menu_orders/my_orders?', {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        "state": [
          'new',
          'waiting_for_confirmation',
          'confirmed'
        ],
        "resort": "/resorts/0dbfee1d-af9d-4489-ad9a-0c402907a028",
        "itemsPerPage": 6,
        "page": 1
      }
    })
      .then(response => {
        setOrders(response.data['hydra:member']);
        console.log(response.data['hydra:member']);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <div className='m-4 rounded-xl'>
      {orders === null ? ( // Check if orders is null
        <p className='text-green-500 text-4xl'>Loading...</p>
      ) : (
        orders.map(order => {
        const date = moment(order.createdAt).format('DD.MM.YYYY');
        const time = moment(order.createdAt).format('HH:mm');
        return (
          <div key={order.id} className='p-4 bg-red-200 rounded-xl flex flex-col gap-4 my-4'>
            <p className='font-bold text-xl'>{order.id}</p>
            <div className='flex flex-row justify-between'>
              <p className='flex flex-row items-center gap-2'><MdOutlineDateRange />{date}</p>
              <p className='flex flex-row items-center gap-2'><CiClock2 />{time}</p>
            </div>
            <div>
              <p>Order Items:</p>
              <ul>
                {order.orderItems.map(item => (
                  <li key={item.id}>
                    <div className='flex flex-row flex-wrap justify-between'>
                      <p>{item.quantity}x {item.orderMenuItem.translations.en.name}</p>
                      <p>{item.finalPrice.amount} {item.finalPrice.currency}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <p className='text-xl'>Final Price: {order.totalPrice.amount} {order.totalPrice.currency}</p>
            <div className='bg-blue-400 w-fit mx-auto px-2 rounded-lg'>{order.state}</div>
          </div>
          );
        })
      )}
    </div>
  );
}

export default Pending;
