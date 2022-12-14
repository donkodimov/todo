"""empty message

Revision ID: 8f476cb89d25
Revises: 96b165364a42
Create Date: 2022-11-25 10:13:30.237901

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8f476cb89d25'
down_revision = '96b165364a42'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('todolists', schema=None) as batch_op:
        batch_op.add_column(sa.Column('completed', sa.Boolean(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('todolists', schema=None) as batch_op:
        batch_op.drop_column('completed')

    # ### end Alembic commands ###
