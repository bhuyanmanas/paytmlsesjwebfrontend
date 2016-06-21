package user

import java.util.UUID

import entity.User
import org.joda.time.DateTime

import scala.util.{Failure, Try}

class UserImpl(
    override val maybeId: Option[UUID],
    override val maybeUserName: Option[String],
    override val email: String,
    override val hashedPassword: String,
    override val isActive: Boolean,
    override val maybeCreated: Option[DateTime] = None,
    override val maybeParentId: Option[UUID])
  extends User {

  override def add(userDAO: UserDAO): Try[User] =
    maybeId.fold[Try[User]](
      userDAO.addFirstTime(this, new DateTime(), UUID.randomUUID())
    )(uUID =>
      Failure[User](new RuntimeException("This user already has a UUID."))
    )

  def this() = this(None, None, "", "", false, None, None)

  override def create(
      maybeId: Option[UUID],
      maybeUserName: Option[String],
      email: String,
      hashedPassword: String,
      isActive: Boolean,
      maybeCreated: Option[DateTime] = None,
      maybeParentId: Option[UUID]): User =
    new UserImpl(maybeId, maybeUserName, email, hashedPassword, isActive=isActive, maybeCreated, maybeParentId)

}
