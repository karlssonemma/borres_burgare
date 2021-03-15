import React from 'react';
import styled from 'styled-components';


function CurrentOrderItem({ item }) {

    return(
        <section>
            <p>{item.count} x {item.title}</p>
            {
                item.extras && item.extras.map(item => {
                    return(
                        <span>+ {item}</span>
                    )
                })
            }
        </section>
    )
};

export default CurrentOrderItem;