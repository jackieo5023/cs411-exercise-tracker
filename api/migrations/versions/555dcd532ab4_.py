"""empty message

Revision ID: 555dcd532ab4
Revises: 0194e56018fd
Create Date: 2020-05-03 19:05:08.359725

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '555dcd532ab4'
down_revision = '0194e56018fd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('people', sa.Column('password', sa.String(length=255), nullable=False))
    op.add_column('people', sa.Column('username', sa.String(length=255), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('people', 'username')
    op.drop_column('people', 'password')
    # ### end Alembic commands ###