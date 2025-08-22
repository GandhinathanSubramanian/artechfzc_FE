export default function AboutPage() {
  return (
    <div>
      <h2>Vertical Slider UI Example</h2>
      <section className="c-hotels">
        <h1 className="c-hotels__title">Stacked cards effect (no JS)</h1>

        <ul className="c-hotels__list">
          <article className="c-hotels__item">
            <figure className="c-hotels__item-figure">
              <img
                src="https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </figure>

            <div className="c-hotels__item-info">
              <h2 className="c-hotels__item-title">Hotel 1</h2>

              <p className="c-hotels__item-subtitle">5 stars</p>

              <p className="c-hotels__item-excerpt">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ducimus quas fugit quis incidunt rerum a aperiam sapiente,
                quibusdam doloremque doloribus debitis, itaque totam esse.
                Corporis illo debitis aperiam quos laboriosam.
              </p>

              <a href="#" className="c-hotels__item-link">
                View More
              </a>
            </div>
          </article>

          <article className="c-hotels__item">
            <figure className="c-hotels__item-figure">
              <img
                src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </figure>

            <div className="c-hotels__item-info">
              <h2 className="c-hotels__item-title">Hotel 2</h2>

              <p className="c-hotels__item-subtitle">3 stars</p>

              <p className="c-hotels__item-excerpt">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ducimus quas fugit quis incidunt rerum a aperiam sapiente,
                quibusdam doloremque doloribus debitis, itaque totam esse.
                Corporis illo debitis aperiam quos laboriosam.
              </p>

              <a href="#" className="c-hotels__item-link">
                View More
              </a>
            </div>
          </article>

          <article className="c-hotels__item">
            <figure className="c-hotels__item-figure">
              <img
                src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </figure>
            <div className="c-hotels__item-info">
              <h2 className="c-hotels__item-title">Hotel 3</h2>

              <p className="c-hotels__item-subtitle">5 stars</p>

              <p className="c-hotels__item-excerpt">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ducimus quas fugit quis incidunt rerum a aperiam sapiente,
                quibusdam doloremque doloribus debitis, itaque totam esse.
                Corporis illo debitis aperiam quos laboriosam.
              </p>

              <a href="#" className="c-hotels__item-link">
                View More
              </a>
            </div>
          </article>
        </ul>
      </section>

      <section className="section-2">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          modi nulla necessitatibus quasi, illo cum deleniti dolores non quo,
          tenetur consequatur exercitationem hic sequi commodi recusandae
          adipisci aspernatur, vitae porro. Voluptate, molestias. Pariatur
          officia maiores sed officiis earum, illum laborum suscipit dolore
          adipisci reiciendis vero itaque architecto assumenda veniam est
          repudiandae? Iure sequi ipsa similique laborum, ex ipsum. Repellat,
          exercitationem. Laudantium maiores illum corporis enim. Repellat autem
          quibusdam accusantium ipsum vitae sapiente soluta aut cum culpa
          suscipit eos aperiam nisi molestias nobis, in quia neque aspernatur.
          Impedit earum repellendus aut. Necessitatibus dicta similique,
          exercitationem voluptates, quia numquam beatae dolorem distinctio
          suscipit libero, accusamus illum quas excepturi eveniet? Aliquid
          fugiat nam, cum illo possimus commodi dolor? Neque debitis velit
          reprehenderit mollitia? Tempore architecto exercitationem odit iusto
          adipisci vero sequi necessitatibus sed alias dolorum recusandae
          asperiores illum, quos, nulla reprehenderit veniam. Vel accusantium
          sed amet ipsam quibusdam sint sit eligendi veniam iure. Dolor, tempora
          ducimus omnis id tenetur velit ut magni laudantium reprehenderit rem,
          nemo alias cum esse dignissimos! Voluptatibus saepe tenetur temporibus
          perspiciatis deleniti! Blanditiis quaerat molestias possimus soluta
          fuga tempore. Iste cupiditate minima neque dolor quis deleniti eius
          officia? Consequatur reprehenderit nihil voluptas assumenda voluptates
          nesciunt magni doloremque, tempora repudiandae quis? Quis esse modi
          eos iure quibusdam doloremque, aperiam laudantium. Unde, esse. Totam
          eos ipsa enim delectus qui fugit corporis modi dolorum reiciendis
          distinctio ab itaque, recusandae inventore ullam corrupti veritatis.
          Rem earum beatae vel cumque tempore sed sapiente illum!
        </p>
      </section>

      {/*  */}
      <section>
        <div className="spacer panel gradient-blue"></div>
        <div className="wrapper center">
          <div className="accordion">
            <div className="item">
              <div className="header">
                <h3>Item Two</h3>
              </div>
              <div className="body" data-haschild="true">
                <div className="content">
                  <div className="horizontal center">
                    <div className="cards-container">
                      <div className="card center gradient-green">Card 1</div>
                      <div className="card center gradient-blue">Card 2</div>
                      <div className="card center gradient-purple">Card 3</div>
                      <div className="card center gradient-orange">Card 4</div>
                      <div className="card center gradient-green-2">Card 5</div>
                      <div className="card center gradient-blue-2">Card 6</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer panel gradient-green"></div>
      </section>

      <section className="section-2">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          modi nulla necessitatibus quasi, illo cum deleniti dolores non quo,
          tenetur consequatur exercitationem hic sequi commodi recusandae
          adipisci aspernatur, vitae porro. Voluptate, molestias. Pariatur
          officia maiores sed officiis earum, illum laborum suscipit dolore
          adipisci reiciendis vero itaque architecto assumenda veniam est
          repudiandae? Iure sequi ipsa similique laborum, ex ipsum. Repellat,
          exercitationem. Laudantium maiores illum corporis enim. Repellat autem
          quibusdam accusantium ipsum vitae sapiente soluta aut cum culpa
          suscipit eos aperiam nisi molestias nobis, in quia neque aspernatur.
          Impedit earum repellendus aut. Necessitatibus dicta similique,
          exercitationem voluptates, quia numquam beatae dolorem distinctio
          suscipit libero, accusamus illum quas excepturi eveniet? Aliquid
          fugiat nam, cum illo possimus commodi dolor? Neque debitis velit
          reprehenderit mollitia? Tempore architecto exercitationem odit iusto
          adipisci vero sequi necessitatibus sed alias dolorum recusandae
          asperiores illum, quos, nulla reprehenderit veniam. Vel accusantium
          sed amet ipsam quibusdam sint sit eligendi veniam iure. Dolor, tempora
          ducimus omnis id tenetur velit ut magni laudantium reprehenderit rem,
          nemo alias cum esse dignissimos! Voluptatibus saepe tenetur temporibus
          perspiciatis deleniti! Blanditiis quaerat molestias possimus soluta
          fuga tempore. Iste cupiditate minima neque dolor quis deleniti eius
          officia? Consequatur reprehenderit nihil voluptas assumenda voluptates
          nesciunt magni doloremque, tempora repudiandae quis? Quis esse modi
          eos iure quibusdam doloremque, aperiam laudantium. Unde, esse. Totam
          eos ipsa enim delectus qui fugit corporis modi dolorum reiciendis
          distinctio ab itaque, recusandae inventore ullam corrupti veritatis.
          Rem earum beatae vel cumque tempore sed sapiente illum!
        </p>
      </section>
    </div>
  );
}
