import React from 'react'
import { formatDuration, formatTime } from '../../utils/formatTime'
import styles from './Ticket.module.scss'
import { Ticket as TicketType } from '../../api/ticketApi'

interface TicketProps {
  data: TicketType
}

const Ticket: React.FC<TicketProps> = ({ data }) => {
  const { price, carrier, segments } = data

  const logoUrl = `https://pics.avs.io/99/36/${carrier}.png`

  const [outboundSegment, returnSegment] = segments

  const stopsInfo = (stops: string[]) => {
    if (stops.length === 0) return ' '
    return stops.join(', ')
  }

  const stopsCountText = (stops: string[]) => {
    if (stops.length === 0) return '0 пересадок'
    return `${stops.length} ${stops.length === 1 ? 'пересадка' : 'пересадки'}`
  }

  const formatDate = (date: Date) => date.toISOString()

  return (
    <section className={styles.Ticket}>
      <div className={styles.Ticket__header}>
        <span className={styles.Ticket__price}>{price.toLocaleString('ru-RU')} Р</span>
        <img className={styles.Ticket__logo} src={logoUrl} alt={`Airline Logo: ${carrier}`} />
      </div>

      <div className={styles.Ticket__info}>
        <div className={styles.Ticket__row}>
          <div className={styles.Ticket__column}>
            <div className={styles.Ticket__cities}>
              {outboundSegment.origin} – {outboundSegment.destination}
            </div>
            <div className={styles.Ticket__time}>
              {formatTime(outboundSegment.date)} –{' '}
              {formatTime(
                formatDate(new Date(new Date(outboundSegment.date).getTime() + outboundSegment.duration * 60000))
              )}
            </div>
          </div>
          <div className={styles.Ticket__column}>
            <div className={styles.Ticket__cities}>
              {returnSegment.origin} – {returnSegment.destination}
            </div>
            <div className={styles.Ticket__time}>
              {formatTime(returnSegment.date)} –{' '}
              {formatTime(
                formatDate(new Date(new Date(returnSegment.date).getTime() + returnSegment.duration * 60000))
              )}
            </div>
          </div>
        </div>

        <div className={styles.Ticket__row}>
          <div className={styles.Ticket__column}>
            <div className={styles.Ticket__way}>В пути</div>
            <div className={styles.Ticket__timeLength}>{formatDuration(outboundSegment.duration)}</div>
          </div>

          <div className={styles.Ticket__column}>
            <div className={styles.Ticket__way}>В пути</div>
            <div className={styles.Ticket__timeLength}>{formatDuration(returnSegment.duration)}</div>
          </div>
        </div>

        <div className={styles.Ticket__row}>
          <div className={styles.Ticket__column}>
            <div className={styles['Ticket__stops-count']}>{stopsCountText(outboundSegment.stops)}</div>
            <div className={styles['Ticket__stops-cities']}>{stopsInfo(outboundSegment.stops)}</div>
          </div>
          <div className={styles.Ticket__column}>
            <div className={styles['Ticket__stops-count']}>{stopsCountText(returnSegment.stops)}</div>
            <div className={styles['Ticket__stops-cities']}>{stopsInfo(returnSegment.stops)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ticket
